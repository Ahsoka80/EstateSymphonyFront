import { Form, Formik } from 'formik';
import { Input, Button, FormHelperText } from "@mui/material";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api/auth';
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const handleLogin = async (data) => {
        let message = '';
        try {
            message = await login(data)
            if (message.status === 422) {
                toast.error('Connexion échouée', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Zoom,
                });
                toast.info(message.data.message, {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Slide,
                })
            } else {
                console.log('Connexion de l\'utilisateur');
                toast.success('Connexion accomplie', {
                    position: 'bottom-left',
                    autoClose: 2000,
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
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                name="email"
                                value={values.email}
                                type="email"
                                onChange={handleChange}
                                fullWidth
                                placeholder='Email'
                            />
                            <FormHelperText>{errors.email}</FormHelperText>
                            <Input
                                name="password"
                                value={values.password}
                                type="password"
                                onChange={handleChange}
                                fullWidth
                                placeholder='Mot de passe'
                            />
                            <FormHelperText>{errors.password}</FormHelperText>
                            <Button
                                type='submit'
                                color='success'
                                // onClick={handleSubmit}
                                size='large'
                                variant='contained'
                            >
                                Se connecter
                            </Button>
                            <Button
                                color='secondary'
                                onClick={handleRegister}
                                size='small'
                            >
                                Inscription
                            </Button>
                            <Button
                                color='info'
                                onClick={handleHome}
                                size='small'
                                variant='text'>
                                Accueil
                            </Button>
                            <ToastContainer />
                        </Form>
                    </>
                );
            }}
        </Formik>
    )
}

export default LoginForm    