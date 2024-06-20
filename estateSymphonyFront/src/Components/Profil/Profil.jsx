import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { useEmail } from "../../utils/api/useEmail";
import { getUserEmail } from "../../utils/api/user";
import CustomButton from "../Buttons/CustomButton";

const ProfilPage = () => {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = useEmail();
    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('Utilisateur pas connecté');
            handleLogout();
            handleHome();
        }
    })
    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                //Utilisateur simple a un idRoles = 4
                if (data.idRoles <= 3) {
                    setIsEmployee(true);
                } else { setIsEmployee(false); }
            })
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
    const handleCreateReal = () => {
        navigate('/profil/createreal');
    }

    return (
        <div>
            <>
                <CustomButton onClick={handleMyAccount} color="info" text={'Mon Compte'} />
                <CustomButton onClick={handleMyFavories} color="info" text={'Mes favoris'} />
                <CustomButton onClick={handleMyAlerts} color="info" text={'Mes alertes'} />
                <CustomButton onClick={handleMyEstimates} color="info" text={'Mes estimations'} />
                {isEmployee ? <CustomButton onClick={handleCreateReal} color="info" text={'Créer un bien'} /> : <></>}
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