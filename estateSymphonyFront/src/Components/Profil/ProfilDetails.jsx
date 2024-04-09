import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import { userUpdate } from "../../utils/api/userUpdate";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Button, FormHelperText, IconButton } from "@mui/material";
import { useEmail } from "../../utils/api/useEmail";
import { AuthContext } from "../../AuthContext/AuthContext";
import { getUserEmail } from "../../utils/api/user";
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBack from "@mui/icons-material/ArrowBack";
import CustomForm from "../Form/CustomForm";
import Home from "@mui/icons-material/Home";

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
                // setError('Informations modifiées');
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
                // setError('Informations non modifiées');
            }
            console.log(error);
        } catch (error) {
            console.error('Erreur survenue : ', error)
            setError(message);
        }
    }

    const handleHome = () => {
        console.log('Retour page d\'accueil..');
        navigate('/');
    }
    const handleBack = () => {
        navigate('/profil/myaccount/')
    }
    const handlePasswordChange = () => {
        console.log('Go page de changement de mot de passe..');
        navigate('/profil/myaccount/password');
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
        //Formulaire de modification du profil
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
                            <CustomForm
                                inputs={[
                                    {
                                        name: "firstname",
                                        value: values.firstname,
                                        type: "text",
                                        onChange: handleChange,
                                        label: 'Prénom',
                                        placeholder: firstnameOld,
                                        required: false,
                                        error: errors.firstname,
                                    },
                                    {
                                        name: "lastname",
                                        value: values.lastname,
                                        type: "text",
                                        onChange: handleChange,
                                        label: 'Nom',
                                        placeholder: lastnameOld,
                                        required: false,
                                        error: errors.lastname,
                                    },
                                ]}
                            >

                            </CustomForm>
                            {error && <FormHelperText variant="standard">{error}</FormHelperText>}
                            <IconButton
                                color="info"
                                onClick={handleBack}>
                                <ArrowBack />
                            </IconButton>
                            <Button
                                type="submit"
                                color="warning"
                                size="large"
                                onClick={handleSubmit}
                            >
                                Enregistrer
                            </Button>
                            <Button
                                color="info"
                                size="large"
                                onClick={handlePasswordChange}
                            >
                                Mot de passe
                            </Button>
                            <Button
                                color="error"
                                size="large"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </Button>
                            <IconButton
                                color="info"
                                onClick={handleHome}
                            >
                                <Home />
                            </IconButton>
                            <ToastContainer />
                        </Form>
                    </>
                )
            }}
        </Formik>
    )
}

export default ProfilForm;