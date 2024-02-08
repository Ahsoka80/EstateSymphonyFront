import { Routes, Route } from 'react-router-dom';
import RegisterForm from '../../Components/Register';
import LoginForm from '../../Components/Login';
import HomePage from '../../Components/Home';
import { AuthContext } from '../../AuthContext/AuthContext';
import { useContext } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ProfilForm from '../../Components/Profil';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const RoutesDisplay = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {isLoggedIn ?
                    (
                        <Routes>
                            <Route path="/profil" element={<ProfilForm />} />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    )
                    :
                    (
                        <Routes>
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    )
                }
            </ThemeProvider>
        </>
    );
}

export default RoutesDisplay;