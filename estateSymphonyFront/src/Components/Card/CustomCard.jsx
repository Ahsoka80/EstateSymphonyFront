/* eslint-disable react/prop-types */

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const CustomCard = ({ item, dashboard }) => {
    let description = item.description;
    let destination = dashboard ? `/dashboard/estate/${item.id}` : `/details/${item.id}`;
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
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default CustomCard
