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

import CustomForm from '../Form/CustomForm';
import { Form, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import * as Yup from 'yup';
import { getAllProperties } from '../../utils/api/properties';
import CustomButton from '../Buttons/CustomButton';

const validation = Yup.object({
  energising: Yup.string()
    .notRequired()
    .matches(/\w+/, "Le mot de passe doit contenir au moins 1 chiffre"),
})

export default function Accueil() {
  // const navigate = useNavigate();

  const handleSearch = async (data) => {
    let message = '';
    try {
      message = await getAllProperties(data);
      console.log(message);

    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
  const { properties } = useContext(PropertiesContext);
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
            {properties.map((item) => {
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
      <div className='mainAccueil'>

        <img className='imgAccueil' src="..\src\assets\img\hklkkjndono.jpg" alt="image d'un salon moderne avec des fauteuil blanc" />

        <div className='accueil'>
          <span>Bonjour Accueil</span>
          <div className='SearchForm'>
            <Formik enableReinitialize
              validationSchema={validation}
              initialValues={{
                energising: '',

              }}
              onSubmit={handleSearch}
            >
              {({ values, handleChange, handleSubmit, errors }) => {
                return (
                  <Box>
                    <Form onSubmit={handleSubmit}>
                      <CustomForm
                        inputs={[
                          {
                            name: 'energising',
                            value: values.energising,
                            type: 'text',
                            onChange: handleChange,
                            label: 'Classe énergétique',
                            error: errors.energising,
                            required: false,
                          },
                          {
                            name: 'floor',
                            value: values.floor,
                            type: 'text',
                            onChange: handleChange,
                            label: 'Nombre d\'étages',
                            error: errors.floor,
                            required: false,
                          },
                          {
                            name: 'parking',
                            value: values.parking,
                            type: 'checkbox',
                            onChange: handleChange,
                            label: 'place de parking',
                            error: errors.parking,
                            required: false,
                          },
                          {
                            name: 'rooms',
                            value: values.rooms,
                            type: 'number',
                            onChange: handleChange,
                            label: 'Pièces',
                            error: errors.rooms,
                            required: false,
                          },
                          {
                            name: 'showerRoom',
                            value: values.showerRoom,
                            type: 'number',
                            onChange: handleChange,
                            label: 'Salle de bain',
                            error: errors.showerRoom,
                            required: false,
                          },
                          {
                            name: 'surface',
                            value: values.surface,
                            type: 'number',
                            onChange: handleChange,
                            label: 'Surface (m²)',
                            error: errors.surface,
                            required: false,
                          },
                        ]}
                      ></CustomForm>
                      <CustomButton
                        onClick={handleSubmit}
                        text={'Rechercher'}
                        style={{ color: 'white' }}
                        type={'submit'}
                        size={'large'}
                        fullWidth={true}
                        variant={'contained'}
                      >
                      </CustomButton>
                    </Form>
                  </Box>
                )
              }}
            </Formik>
          </div>
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
