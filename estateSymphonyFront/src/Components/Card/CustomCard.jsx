/* eslint-disable react/prop-types */

import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import { archiveProperty, restoreProperty } from "../../utils/api/properties";

const CustomCard = ({ item, dashboard, archived }) => {
    let description = item.description;
    let destination = dashboard ? `/dashboard/estate/${item.id}` : `/details/${item.id}`;
    const handleArchive = async (id) => {
        try {
            const response = await archiveProperty(id);
            console.log(response);
        } catch (error) {
            console.error("Erreur lors de l'archivage de la propriété:", error);
        }
    }
    const handleRestore = async (id) => {
        try {
            const response = await restoreProperty(id);
            console.log(response);
        } catch (error) {
            console.error("Erreur lors de la restauration de la propriété:", error);
        }

    }
    return (
        <>
            <Card className='card-item' key={item.id}>
                <Link to={destination} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                            Prix : {item.price}<br></br>
                            Type : {description.length > 30 ? description.substring(0, 30) + '...' : description} <br></br>
                            Surface : {item.surface} <br></br>
                            Nombres de pièces : {item.rooms} <br></br>
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions>
                    {dashboard ?
                        <>
                            {archived ?
                                <IconButton
                                    size="large"
                                    color="success"
                                    onClick={() => handleRestore(item.id)}
                                >
                                    <RestoreIcon></RestoreIcon>
                                </IconButton>
                                :
                                <IconButton
                                    size="large"
                                    color="warning"
                                    onClick={() => handleArchive(item.id)}
                                >
                                    <ArchiveIcon></ArchiveIcon>
                                </IconButton>
                            }
                        </>
                        :
                        <><Button size="small">Share</Button>
                            <Button size="small">Learn More</Button></>
                    }

                </CardActions>
            </Card>
        </>
    );
};

export default CustomCard
