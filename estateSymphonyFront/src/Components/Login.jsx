import { Formik } from 'formik';
import { Input, Button, FormHelperText } from "@mui/material";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

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
    const { login } = useContext(AuthContext);
    const handleLogin = async (data) => {
        try {
            console.log("Connexion de l'utilisateur..");
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {
                sessionStorage.setItem('token', responseData.token);
                login(responseData.token);
                console.log('Utilisateur connecté avec succès !');
                navigate('/home');
            } else {
                console.log('Echec de la connexion : ', responseData.message);
                setError(responseData.message)
            }
        } catch (error) {
            console.error('Erreur : ', error);
            setError('Erreur lors de la connexion..')
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
                            color='success'
                            onClick={handleSubmit}
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
                    </>
                );
            }}
        </Formik>
    )
}

export default LoginForm    