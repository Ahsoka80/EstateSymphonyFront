import React from 'react'
import './Accueil.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Accueil() {
  return (
    <>
        <div className='mainAccueil'>
            
            <img className='imgAccueil' src="..\src\assets\img\hklkkjndono.jpg" alt="image d'un salon moderne avec des fauteuil blanc"/>
            
            <div className='accueil'>
              <span>Bonjour Accueil</span>
            </div>

            <div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="../src/assets/img/maisons-modernes-modeles-plans-amenagement.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
            </div>

        </div>
        
        
        
    </>
  )
}
