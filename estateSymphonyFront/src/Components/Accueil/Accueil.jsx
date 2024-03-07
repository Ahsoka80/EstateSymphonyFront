import './Accueil.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import PropertiesContext from '../../context/propertieContext';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'



export default function Accueil() {
const {properties} = useContext(PropertiesContext);
// const properties = context.properties
console.log(properties.slice(-4));
  return (
    <>
      <Container>
        <Row>
          <img className='imgAccueil' src="..\src\assets\img\hklkkjndono.jpg" alt="image d'un salon moderne avec des fauteuil blanc" />
          <h1 className='accueil'>Bonjour Accueil</h1>
        </Row>
        <Row className='rowLastAnnoncement'>
          
          <Col className='mt-3'>
            <span>Les dernières annonces :</span>
          </Col>
        
          <Col className='card'>
            {properties.map((item)=>{
              return(
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
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
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
        </Row>
        <Row>
          <Col>
            <span> Favories :</span>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}
