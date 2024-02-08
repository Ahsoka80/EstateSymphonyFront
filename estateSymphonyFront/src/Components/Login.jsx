import { Form, Formik } from 'formik';
import { Input, Button, FormHelperText } from "@mui/material";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../utils/api/auth';

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
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (data) => {
        let message = '';
        try {
            message = await login(data)
            setError(message)
        } catch (error) {
            console.error('Erreur : ', error);
            setError(message)
        }
    };

    const handleRegister = () => {
        navigate('/register');
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
                            {error && <FormHelperText error>{error}</FormHelperText>}
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
                        </Form>
                    </>
                );
            }}
        </Formik>
    )
}

export default LoginForm    