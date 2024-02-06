import { Formik } from 'formik';
import { Input } from "@mui/material";


const LoginForm = () => {

    const handleLogin = (data) => {
        console.log('Identifiant : ', data);
    };
    return (
        <Formik enableReinitialize
            initialValues={{
                email: 'Email',
                password: 'Password'
            }}
            onSubmit={handleLogin}
        >
            {
                ({ values, handleChange }) => {
                    return (
                        <>
                            <Input name="email" value={values.email} type="email" onChange={handleChange} />
                            <Input name="password" value={values.password} type="password" onChange={handleChange} />
                        </>
                    );
                }
            }
        </Formik>
    )
}

export default LoginForm    