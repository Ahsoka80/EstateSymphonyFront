import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import Home from "@mui/icons-material/Home";

const ProfilPage = () => {
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
    const handleMyAccount = () => {
        navigate('/profil/myaccount');
    }
    const handleMyFavories = () => {
        navigate('/profil/myfavories');
    }
    const handleMyAlerts = () => {
        navigate('/profil/myalerts');
    }
    const handleMyEstimates = () => {
        navigate('/profil/myestimates');
    }

    return (
        <div>
            <>
                <Button onClick={handleMyAccount} color="info">Mon Compte</Button>
                <Button onClick={handleMyFavories} color="info">Mes favoris</Button>
                <Button onClick={handleMyAlerts} color="info">Mes alertes</Button>
                <Button onClick={handleMyEstimates} color="info">Mes estimations</Button>
                <IconButton
                    color="info"
                    onClick={handleHome}
                >
                    <Home />
                </IconButton>
            </>
        </div>
    );
};

export default ProfilPage