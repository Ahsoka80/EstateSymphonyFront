import { Button, Input, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


//Validation des champs du formulaire
const validation = Yup.object({
    firstname: Yup.string().notRequired(),
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
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //Après validation des données du formulaire, envoi des données à l'API pour la création de l'utilisateur
    const handleRegister = async (data) => {
        try {
            console.log("Inscription de l'utilisateur");
            const response = await fetch('http://127.0.0.1:3000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Utilisateur inscrit avec succès !');
                navigate('/login');
            } else {
                console.log("Erreur lors de l'inscription : ", responseData.message);
                setError(responseData.message)
            }
        } catch (error) {
            console.error('Erreur réseau : ', error);
            setError('Erreur inscription..')
        }
    };

    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
                firstname: '',
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
                            placeholder="Nom d'utilisateur"
                        />
                        <Input name='email'
                            value={values.email}
                            type='email'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Email'
                        />
                        <FormHelperText>{errors.email}</FormHelperText>
                        <Input name='password'
                            value={values.password}
                            type='password'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Mot de passe'
                        />
                        <FormHelperText>{errors.password}</FormHelperText>
                        <Input name='confirmedPassword'
                            value={values.confirmedPassword}
                            type='password'
                            onChange={handleChange}
                            fullWidth
                            placeholder='Confirmer le mot de passe'
                        />
                        <FormHelperText>{errors.confirmedPassword}</FormHelperText>
                        {error && <FormHelperText error>{error}</FormHelperText>}
                        <Button
                            color='success'
                            onClick={handleSubmit}
                            size='large'
                            variant='contained'
                        >
                            S inscrire
                        </Button>
                        <Button
                            color='secondary'
                            onClick={handleLogin}
                            size='small'
                            variant='text'
                        >
                            Connexion
                        </Button>

                    </>
                )
            }}
        </Formik>
    )
}

export default RegisterForm