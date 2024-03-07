import { Form, Formik } from 'formik';
import { Button, Box, IconButton } from "@mui/material";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api/auth';
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBack from '@mui/icons-material/ArrowBack';
import CustomForm from '../../Components/Form/CustomForm';
import React from 'react';
import CustomButton from '../../Components/Buttons/CustomButton';
import './Login.css';


//Validation des champs du formulaire de connexion
const validation = Yup.object({
    email: Yup.string().email('Cet email ne correspond pas une adresse email valide').required('Le champ Email est obligatoire'),
    password: Yup.string()
        .required('Ce champ est obligatoire')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Le mot de passe doit contenir au moins 1 minuscule et 1 majuscule")
        .matches(/\d/, "Le mot de passe doit contenir au moins 1 chiffre")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Le mot de passe doit contenir au moins 1 caractère spécial")
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = async (data) => {
        let message = '';
        try {
            message = await login(data)
            if (message.status === 422) {
                toast.error('Connexion échouée', {
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
                console.log('Connexion de l\'utilisateur');
                toast.success('Connexion réussi', {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                })
                navigate('/');
            }
        } catch (error) {
            console.error('Erreur : ', error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={handleLogin}
        >
            {({ values, handleChange, handleSubmit, errors }) => {
                return (
                    <Box sx={{ '& button': { marginTop: 2 } }}>
                        <div className='arrowBack'>
                            <IconButton
                                color='info'
                                onClick={handleHome}
                            >
                                <ArrowBack />
                            </IconButton>
                        </div>
                        <h2>Connexion</h2>
                        <div className='form'>
                            <Form onSubmit={handleSubmit}>
                                <CustomForm
                                    inputs={[
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
                                    ]}
                                >
                                </CustomForm>

                                <CustomButton
                                    onClick={handleSubmit}
                                    // type={'contained'}
                                    text={'Connexion'}
                                    style={{ color: 'white' }}
                                    iconPosition={'right'}
                                    type={'submit'}
                                    color={'success'}
                                    size={'large'}
                                    fullWidth={true}
                                    variant={'contained'}

                                />
                                <Button
                                    fullWidth
                                    variant='text'
                                    color='secondary'
                                    onClick={handleRegister}
                                    size='small'
                                >
                                    Pas encore inscrit ?
                                </Button>
                                
                                <ToastContainer />
                            </Form>
                        </div>
                    </Box>
                );
            }}
        </Formik>
    )
}

export default LoginForm    