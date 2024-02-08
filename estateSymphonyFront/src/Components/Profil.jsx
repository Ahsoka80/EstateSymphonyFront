import React, { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import { userUpdate } from "../utils/api/userUpdate";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Button, FormHelperText, Input } from "@mui/material";
import { useEmail } from "../utils/api/useEmail";
import { AuthContext } from "../AuthContext/AuthContext";
import { getUserEmail } from "../utils/api/user";
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validation = Yup.object({
    firstname: Yup.string().notRequired(),
    lastname: Yup.string().notRequired(),
})

const ProfilForm = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [firstnameOld, setUserFirstname] = useState('');
    const [lastnameOld, setUserLastname] = useState('');
    const email = useEmail();

    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setUserFirstname(data.firstname);
                setUserLastname(data.lastname);
            })
            console.log('Utilisateur connecté');
        } else {
            console.log('Utilisateur pas connecté, retour page d\'acceuil');
            navigate('/');
        }
    }, [isLoggedIn, email, navigate])

    const handleUpdate = async (data) => {
        let message = '';
        try {
            console.log('Modification des informations de l\'utilisateur');
            message = await userUpdate(data);
            if (message.status === 200) {
                toast.success('Informations modifiées', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Bounce,
                })
                setError('Informations modifiées');
            } else {
                toast.warn('Informations non modifiées', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Bounce,
                })
                setError('Informations non modifiées');
            }
            console.log(error);
        } catch (error) {
            console.error('Erreur survenue : ', error)
            setError(message);
        }
    }

    const handleBackHome = () => {
        console.log('Retour page d\'accueil..');
        navigate('/');
    }
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
        toast.error('Déconnexion', {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            transition: Flip,
        })
        if (!isLoggedIn) {
            navigate('/');
        }
    }

    return (
        <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
                firstname: firstnameOld,
                lastname: lastnameOld,
            }}
            onSubmit={handleUpdate}
        >
            {({ values, handleChange, handleSubmit, errors }) => {
                return (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                name="firstname"
                                value={values.firstname}
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                placeholder={firstnameOld}
                            />
                            <FormHelperText>{errors.firstname}</FormHelperText>
                            <Input
                                name="lastname"
                                value={values.lastname}
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                placeholder={lastnameOld}
                            />
                            <FormHelperText>{errors.lastname}</FormHelperText>
                            {error && <FormHelperText variant="standard">{error}</FormHelperText>}
                            <Button
                                color="info"
                                size="large"
                                onClick={handleBackHome}
                            >
                                Retour
                            </Button>
                            <Button
                                type="submit"
                                color="warning"
                                size="large"
                                onClick={handleSubmit}
                            >
                                Enregistrer
                            </Button>
                            <Button
                                color="error"
                                size="large"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </Button>
                            <ToastContainer />
                        </Form>
                    </>
                )
            }}
        </Formik>
    )
}

export default ProfilForm;