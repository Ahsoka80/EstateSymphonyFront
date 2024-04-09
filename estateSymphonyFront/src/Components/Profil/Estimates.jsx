import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useEmail } from "../../utils/api/useEmail";
import { getUserEmail } from "../../utils/api/user";
import { getAllEstimateByOne } from "../../utils/api/estimate";
import Col from "react-bootstrap/esm/Col";

const Estimates = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [estimations, setEstimations] = useState([]);
    const email = useEmail();
    const [idUser, setIdUser] = useState('');
    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setIdUser(data.id);
            })
        } else {
            console.log('Utilisateur pas connecté, retour page d\'acceuil');
            navigate('/');
        }
    }, [isLoggedIn, email, navigate])
    useEffect(() => {
        if (isLoggedIn) {
            getAllEstimateByOne(idUser).then(data => {
                setEstimations(data);
            })
        } else {
            console.log('Utilisateur pas connecté, retour page d\'acceuil');
            navigate('/');
        }
    })


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
            {
                (estimations) ?
                    <Col className='card'>
                        {estimations.map((item) => {
                            return (
                                <Card key={item.id} sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image="../src/assets/img/maisons-modernes-modeles-plans-amenagement.jpg"
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.location}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Type : {item.houseType} <br></br>
                                            Surface : {item.surface} <br></br>
                                            Nombres de pièces : {item.room} <br></br>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </Col>
                    :
                    <div></div>
            }
        </>
    )
}
export default Estimates