import { Button, Typography } from "@mui/material";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "../utils/api/user";
import { useEmail } from "../utils/api/useEmail";
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const HomePage = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userFirstname, setUserFirstname] = useState(' ');
    const [userLastname, setUserLastname] = useState(' ');
    const email = useEmail();
    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setUserFirstname(data.firstname);
                setUserLastname(data.lastname);
            })
            console.log('Utilisateur connecté');
            if (userFirstname !== ' ' || userLastname !== ' ') {
                toast.info(`Bonjour ${userFirstname} ${userLastname}`, {
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
        } else {
            console.log('Utilisateur déconnecté');
        }
    }, [isLoggedIn, email, userFirstname, userLastname])
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
    };
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    const handleProfil = () => {
        navigate('/profil');
    }


    return (
        <div>
            {isLoggedIn ?
                (<>
                    <Button onClick={handleLogout} color="error">Se déconnecter</Button>
                    <Button onClick={handleProfil} color="info">Profil</Button>
                    <Typography >{userFirstname}</Typography>
                    <Typography >{userLastname}</Typography>
                </>
                )
                :
                (
                    <>
                        <Button onClick={handleLogin} color="primary" variant="contained">Se connecter</Button>
                        <Button onClick={handleRegister} color="secondary" variant="contained">Inscription</Button>
                    </>
                )
            }
            <ToastContainer />
        </div>
    );
};
export default HomePage