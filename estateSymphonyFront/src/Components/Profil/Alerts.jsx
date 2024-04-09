import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";

const Alerts = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        console.log('Retour page d\'accueil..');
        navigate('/')
    }
    const handleBack = () => {
        console.log(('Retour en page précédente..'));
        navigate('/profil')
    }
    return (
        <>
            <IconButton
                color="info"
                onClick={handleBack}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                color="info"
                onClick={handleHome}
            >
                <Home />
            </IconButton>
        </>
    )
}
export default Alerts