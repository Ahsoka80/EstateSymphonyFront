import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { userPasswordUpdate } from "../../utils/api/userUpdate";
import { Form, Formik } from "formik";
import { Button, IconButton } from "@mui/material";
import * as Yup from 'yup';
import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import CustomForm from "../Form/CustomForm";

const validation = Yup.object({
    passwordOld: Yup.string()
        .required('Ce champ est obligatoire'),
    password: Yup.string()
        .required('Ce champ est obligatoire')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Le mot de passe doit contenir au moins 1 minuscule et 1 majuscule")
        .matches(/\d/, "Le mot de passe doit contenir au moins 1 chiffre")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Le mot de passe doit contenir au moins 1 caractère spécial")
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    passwordNewConfirmed: Yup.string().when('password', (password, field) => {
        if (password) {
            return field.required('Confirmer le mot de passe').oneOf([Yup.ref('password')], "Les mots de passe ne sont pas identiques")
        }
    })
})

const ProfilPassword = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            console.log('Utilisateur connecté');
        } else {
            console.log('Utilisateur pas connecté, retour page d\'accueil');
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleUpdate = async (data) => {
        let message = '';
        try {
            console.log('Modification du mot de passe..');
            message = await userPasswordUpdate(data);
            if (message.status === 422) {
                toast.error('Mot de passe non modifié', {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Bounce,
                });
                toast.info(message.data.message, {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Bounce,
                });
            } else if (message.status === 200) {
                toast.success('Mot de passe modifié', {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                })
            }
        } catch (error) {
            console.error('Erreur : ', error);
        }
    };

    const handleHome = () => {
        navigate('/');
    }
    const handleBack = () => {
        navigate('/profil/myaccount');
    }
    const handleInfos = () => {
        navigate('/profil/myaccount/details')
    }
    return (
        //Formulaire de modification du mot de passe

        <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
                passwordOld: '',
                password: '',
                passwordNewConfirmed: '',
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
                                        name: "passwordOld",
                                        value: values.passwordOld,
                                        type: "text",
                                        onChange: handleChange,
                                        placeholder: "Ancien mot de passe",
                                        required: true,
                                        error: errors.passwordOld,
                                    },
                                    {
                                        name: "password",
                                        value: values.password,
                                        type: "text",
                                        onChange: handleChange,
                                        placeholder: "Nouveau mot de passe",
                                        required: true,
                                        error: errors.password,
                                    },
                                    {
                                        name: "passwordNewConfirmed",
                                        value: values.passwordNewConfirmed,
                                        type: "text",
                                        onChange: handleChange,
                                        placeholder: "Confirmation du mot de passe",
                                        required: true,
                                        error: errors.passwordNewConfirmed,
                                    },
                                ]}>

                            </CustomForm>
                            <IconButton
                                color="info"
                                onClick={handleBack}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Button
                                color="info"
                                size="large"
                                onClick={handleInfos}
                            >
                                Informations
                            </Button>
                            <Button
                                type="submit"
                                color="warning"
                                size="large"
                                onClick={handleSubmit}
                            >
                                Enregistrer
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


export default ProfilPassword;