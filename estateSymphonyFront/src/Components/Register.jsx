import * as React from 'react';
import { Button, Box, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api/auth';
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomForm from './Form/CustomForm';


//Validation des champs du formulaire
const validation = Yup.object({
    firstname: Yup.string().notRequired(),
    lastname: Yup.string().notRequired(),
    email: Yup.string().email('Cet email ne correspond pas une adresse email valide').required('Le champ Email est obligatoire'),
    password: Yup.string()
        .required('Ce champ est obligatoire')
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Le mot de passe doit contenir au moins 1 minuscule et 1 majuscule")
        .matches(/\d/, "Le mot de passe doit contenir au moins 1 chiffre")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Le mot de passe doit contenir au moins 1 caractère spécial"),
    confirmedPassword: Yup.string().when('password', (password, field) => {
        if (password) {
            return field.required('Confirmer le mot de passe').oneOf([Yup.ref('password')], "Les mots de passe ne sont pas identiques")
        }
    })
})

const RegisterForm = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmedPassword = () => setShowConfirmedPassword((show) => !show);
    //Après validation des données du formulaire, envoi des données à l'API pour la création de l'utilisateur
    const handleRegister = async (data) => {
        let message = '';
        try {
            message = await register(data);
            if (message.status === 422) {
                toast.error('Inscription échouée', {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Zoom,
                });
                toast.info(message.data.message, {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Slide,
                })
            } else {
                console.log("Inscription de l'utilisateur");
                toast.success('Inscription réussi', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                });
                handleHome();
            }
        } catch (error) {
            console.error('Erreur réseau : ', error);
            toast.error(error, {
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
    };

    const handleLogin = () => {
        navigate('/login');
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmedPassword: '',
            }}
            onSubmit={handleRegister}
        >
            {({ values, handleChange, handleSubmit, errors }) => {
                return (
                    <Box sx={{ '& button': { marginTop: 2 } }}>
                        <IconButton
                            color='info'
                            onClick={handleHome}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Form onSubmit={handleSubmit}>
                            <CustomForm
                                inputs={[
                                    {
                                        name: 'firstname',
                                        value: values.firstname,
                                        type: 'text',
                                        onChange: handleChange,
                                        label: 'Prénom',
                                        error: errors.firstname,
                                        required: false,
                                    },
                                    {
                                        name: 'lastname',
                                        value: values.lastname,
                                        type: 'text',
                                        onChange: handleChange,
                                        label: 'Nom',
                                        error: errors.lastname,
                                        required: false,
                                    },
                                    {
                                        name: 'email',
                                        value: values.email,
                                        type: 'text',
                                        onChange: handleChange,
                                        label: 'Email',
                                        error: errors.email,
                                        required: true,
                                    },
                                    {
                                        name: 'password',
                                        value: values.password,
                                        type: 'password',
                                        onChange: handleChange,
                                        label: 'Mot de passe',
                                        error: errors.password,
                                        required: true,
                                        secured: true,
                                        showPassword: showPassword,
                                        handleClickShowPassword: handleClickShowPassword,
                                    },
                                    {
                                        name: 'confirmedPassword',
                                        value: values.confirmedPassword,
                                        type: 'password',
                                        onChange: handleChange,
                                        label: 'Confirmer mot de passe',
                                        error: errors.confirmedPassword,
                                        required: true,
                                        secured: true,
                                        showPassword: showConfirmedPassword,
                                        handleClickShowPassword: handleClickShowConfirmedPassword,
                                    },
                                ]}
                            />
                            <Button
                                color='success'
                                onClick={handleSubmit}
                                size='large'
                                variant='contained'
                                fullWidth
                            >
                                S'inscrire
                            </Button>
                            <Button
                                fullWidth
                                color='secondary'
                                onClick={handleLogin}
                                size='small'
                                variant='text'
                            >
                                Déjà inscrit ?
                            </Button>
                            <ToastContainer />
                        </Form>
                    </Box>
                )
            }}
        </Formik >
    )
}

export default RegisterForm