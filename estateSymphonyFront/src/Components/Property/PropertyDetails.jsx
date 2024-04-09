import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProperty } from '../../utils/api/properties'
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const Details = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        getProperty(id).then(data => {
            setItem(data);
        });
    }, [id])
    return (
        !item ?
            <Typography>Coucou</Typography>
            :
            <>
                <Card>
                    <Col>
                        <Row>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Row>
                        <Row>
                            <CardMedia sx={{ height: 140 }}
                                image="../src/assets/img/maisons-modernes-modeles-plans-amenagement.jpg"
                                title="green iguana">
                            </CardMedia>
                        </Row>
                        <Row>
                            <CardContent>
                                Prix : {item.price} <br></br>
                                Surface : {item.surface} <br></br>
                                Nombres de salle de bain : {item.showerRoom} <br></br>
                                Nombres de pièces : {item.rooms} <br></br>
                                Classe énergétique : {item.energising} <br></br>
                                Place de parking : {item.parking ? 'Oui' : 'Non'} ({item.parking}) <br></br>
                                Quartier : {item.district.name}<br></br>

                            </CardContent>
                        </Row>
                    </Col>
                </Card>
            </>
    )
}
export default Details
