import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBack from "@mui/icons-material/ArrowBack";


const Account = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            console.log('Utilisateur pas connecté');
            handleLogout();
            handleHome();
        }
    })
    const handleHome = () => {
        navigate('/');
    }
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
    }
    const handlePersonalInformations = () => {
        navigate('/profil/myaccount/details');
    }
    const handlePassword = () => {
        navigate('/profil/myaccount/password');
    }
    const handleMyAccount = () => {
        navigate('/profil');
    }


    return (
        <div>
            <>
                <IconButton
                    color="info"
                    onClick={handleMyAccount}
                >
                    <ArrowBack />
                </IconButton>
                <Button onClick={handlePersonalInformations} color="info">Informations personnelles</Button>
                <Button onClick={handlePassword} color="info">Mot de passe</Button>
                <IconButton
                    color="info"
                    onClick={handleHome}
                >
                    <HomeIcon />
                </IconButton>

            </>
        </div>
    );
};

export default Account