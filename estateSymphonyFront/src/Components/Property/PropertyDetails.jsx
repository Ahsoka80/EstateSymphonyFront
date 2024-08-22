import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProperty } from '../../utils/api/properties'
import { Card, CardContent, CardMedia, Typography, Grid, Modal, Fade } from "@mui/material";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { getPhotosByProperty } from '../../utils/api/photos';


const Details = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const URL_API = `http://127.0.0.1:3000`;
    useEffect(() => {
        getProperty(id).then(data => { setItem(data); });
        getPhotosByProperty(id).then(data => { setPhotos(data) });
    }, [id])


    const handleOpen = (photo) => {
        setSelectedPhoto(photo);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        !item ?
            <Typography>Oups une erreur s'est produite..</Typography>
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

                                image={photos[0]?.photo.startsWith('/public') ? URL_API + photos[0]?.photo.substring(7) : URL_API + photos[0]?.photo}
                                title={photos[0]?.photo}>
                            </CardMedia>
                        </Row>
                        <Row>
                            <CardContent>
                                Prix : {item.price} <br></br>
                                Surface : {item.surface} <br></br>
                                Nombres de salle de bain : {item.showerRoom} <br></br>
                                Nombres de pièces : {item.rooms} <br></br>
                                Classe énergétique : {item.energising} <br></br>
                                Place de parking : {item.parking ? 'Oui' : 'Non'}<br></br>
                                Quartier : {item.district.name}<br></br>

                            </CardContent>
                        </Row>
                    </Col>
                </Card >
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                    {photos.map((photo, index) => (
                        <Grid item xs={6} sm={3} key={index} onClick={() => handleOpen(photo)}>
                            <img
                                src={photo.photo.startsWith('/public') ? URL_API + photo.photo.substring(7) : URL_API + photo.photo}
                                alt={`Photo ${index}`}
                                style={{ width: '100%', cursor: 'pointer' }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Fade in={open}>
                        <div>
                            <img
                                src={selectedPhoto ? (selectedPhoto.photo.startsWith('/public') ? URL_API + selectedPhoto.photo.substring(7) : URL_API + selectedPhoto.photo) : ''}
                                alt="Selected Photo"
                                style={{ maxHeight: '100vh', width: '100%', margin: 'auto', display: 'block' }}
                            />
                        </div>
                    </Fade>
                </Modal>
            </>
    )
}
export default Details
