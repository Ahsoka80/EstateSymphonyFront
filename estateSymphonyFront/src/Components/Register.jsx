import { Button, Input, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api/auth';
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    //Après validation des données du formulaire, envoi des données à l'API pour la création de l'utilisateur
    const handleRegister = async (data) => {
        let message = '';
        try {
            message = await register(data);
            if (message.status === 422) {
                toast.error('Inscription échouée', {
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
                console.log("Inscription de l'utilisateur");
                toast.success('Inscription accomplie', {
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
            console.error('Erreur réseau : ', error);
            toast.error(error, {
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
                    <>
                        <Input
                            name='firstname'
                            value={values.firstname}
                            type='text'
                            onChange={handleChange}
                            fullWidth
                            placeholder="Prénom"
                        />
                        <Input
                            name='lastname'
                            value={values.lastname}
                            type='text'
                            onChange={handleChange}
                            fullWidth
                            placeholder="Nom"
                        />
                        <Input name='email'
                            value={values.email}
                            type='email'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Email'
                            required
                        />
                        <FormHelperText>{errors.email}</FormHelperText>
                        <Input name='password'
                            value={values.password}
                            type='password'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Mot de passe'
                            required
                        />
                        <FormHelperText>{errors.password}</FormHelperText>
                        <Input name='confirmedPassword'
                            value={values.confirmedPassword}
                            type='password'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Confirmer le mot de passe'
                            required
                        />
                        <FormHelperText>{errors.confirmedPassword}</FormHelperText>
                        {/* {error && <FormHelperText error>{error}</FormHelperText>} */}
                        <Button
                            color='success'
                            onClick={handleSubmit}
                            size='large'
                            variant='contained'
                        >
                            S'inscrire
                        </Button>
                        <Button
                            color='secondary'
                            onClick={handleLogin}
                            size='small'
                            variant='text'
                        >
                            Connexion
                        </Button>
                        <Button
                            color='info'
                            onClick={handleHome}
                            size='small'
                            variant='text'>
                            Accueil
                        </Button>
                        <ToastContainer />
                    </>
                )
            }}
        </Formik>
    )
}

export default RegisterForm