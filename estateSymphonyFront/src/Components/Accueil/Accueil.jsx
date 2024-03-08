import './Accueil.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import PropertiesContext from '../../context/propertieContext';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import CustomForm from '../Form/CustomForm';
// eslint-disable-next-line no-unused-vars
import { Form, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import * as Yup from 'yup';
import { getAllProperties, getPropertiesBySearch } from '../../utils/api/properties';
import CustomButton from '../Buttons/CustomButton';
import { getAllDistricts } from '../../utils/api/districts';
import { getAllStatuses } from '../../utils/api/statuses';

const validation = Yup.object({
  energising: Yup.string()
    .notRequired()
    .matches(/^[A-G]$/, "Le mot de passe doit contenir une lettre de A à G"),
})

export default function Accueil() {
  // const navigate = useNavigate();
  const [districts, setDistricts] = useState([])
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    getAllDistricts()
      .then(data => {
        console.log(data);
        setDistricts(data)
      });
    getAllStatuses()
      .then(data => {
        console.log(data);
        setStatuses(data);
      })
  }, []);

  statuses.forEach(status => {
    if (!status.hidden) {
      status.name = status.sold ? 'En vente' : (status.rent ? 'A louer' : 'Indisponible')
    }
  });

  const typeEnergicList = [
    {
      id: 'Electrique',
      name: 'Electrique'
    },
    {
      id: 'Gaz',
      name: 'Gaz'
    },
    {
      id: 'Fioul',
      name: 'Fioul'
    },
  ]

  const heatingSystems = [{ id: 'Pompe à chaleur', name: 'Pompe à chaleur' }, { id: 'Panneaux solaires', name: 'Panneaux solaires' }]

  const handleSearch = async (data) => {
    let message = '';
    try {
      message = await getAllProperties();
      console.log('Toutes les propriétés : ');
      console.log(message);
      message = await getPropertiesBySearch(data);
      if (message && message.length !== 0) {
        console.log('Propriétés selon recherche : ');
        console.log(message[0]);
      }

    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
  const { properties } = useContext(PropertiesContext);
  // const properties = context.properties
  // console.log(properties.slice(-4));
  return (
    <>
      <Container>
        <Row>
          <img className='imgAccueil' src="..\src\assets\img\hklkkjndono.jpg" alt="image d'un salon moderne avec des fauteuil blanc" />
          <h1 className='accueil'>Bonjour Accueil</h1>
          <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{}}
            onSubmit={handleSearch}
          >
            {({ values, handleChange, handleSubmit, errors }) => {
              return (
                <Box>
                  <Form onSubmit={handleSubmit}>
                    <CustomForm
                      inputs={[
                        //#region PRICE
                        {
                          name: 'price',
                          value: values.price,
                          type: 'number',
                          onChange: handleChange,
                          label: 'Prix',
                          error: errors.price,
                          required: false,
                        },
                        //#endregion
                        //#region STATUS
                        {
                          name: 'status',
                          value: values.status,
                          type: 'text',
                          onChange: handleChange,
                          label: 'Etat (En vente, en location, vendu ou loué)',
                          error: errors.status,
                          required: false,
                          inputType: 'select',
                          items: statuses,
                        },
                        //#endregion
                        //#region ENERGISING
                        {
                          name: 'energising',
                          value: values.energising,
                          type: 'text',
                          onChange: handleChange,
                          label: 'Classe énergétique',
                          error: errors.energising,
                          required: false,
                        },
                        //#endregion
                        //#region FLOOR
                        {
                          name: 'floor',
                          value: values.floor,
                          type: 'number',
                          onChange: handleChange,
                          label: 'Nombre d\'étages',
                          error: errors.floor,
                          required: false,
                        },
                        //#endregion
                        //#region PARKING
                        {
                          name: 'parking',
                          value: values.parking,
                          type: 'checkbox',
                          onChange: handleChange,
                          label: 'Place de parking',
                          error: errors.parking,
                          required: false,
                        },
                        //#endregion
                        //#region BALCONY
                        {
                          name: 'balcony',
                          value: values.balcony,
                          type: 'checkbox',
                          onChange: handleChange,
                          label: 'Balcon',
                          error: errors.balcony,
                          required: false,
                        },
                        //#endregion
                        //#region ROOMS
                        {
                          name: 'rooms',
                          value: values.rooms,
                          type: 'number',
                          onChange: handleChange,
                          label: 'Pièces',
                          error: errors.rooms,
                          required: false,
                        },
                        //#endregion
                        //#region SHOWER ROOMS
                        {
                          name: 'showerRoom',
                          value: values.showerRoom,
                          type: 'number',
                          onChange: handleChange,
                          label: 'Salle de bain',
                          error: errors.showerRoom,
                          required: false,
                        },
                        //#endregion
                        //#region SURFACE
                        {
                          name: 'surface',
                          value: values.surface,
                          type: 'number',
                          onChange: handleChange,
                          label: 'Surface minimum (m²)',
                          error: errors.surface,
                          required: false,
                        },
                        //#endregion
                        //#region TYPE ENERGIC
                        {
                          name: 'typeEnergic',
                          value: values.typeEnergic,
                          type: 'text',
                          onChange: handleChange,
                          label: 'Type de chauffage',
                          error: errors.typeEnergic,
                          required: false,
                          inputType: 'select',
                          items: typeEnergicList,
                        },
                        //#endregion
                        //#region DISTRICT
                        {
                          name: 'district',
                          value: values.district,
                          type: 'text',
                          onChange: handleChange,
                          label: 'Quartier',
                          error: errors.district,
                          required: false,
                          inputType: 'select',
                          items: districts,
                        },
                        //#endregion
                        //#region HEATING SYSTEM
                        {
                          name: 'heatingSystem',
                          value: values.heatingSystem,
                          type: 'text',
                          onChange: handleChange,
                          label: 'Systeme de chauffage',
                          error: errors.heatingSystem,
                          required: false,
                          inputType: 'select',
                          items: heatingSystems,
                        },
                        //#endregion
                        //#region RESET
                        {
                          type: 'reset',
                          value: 'Réinitialiser',
                        },
                        //#endregion
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



    </>
  )
}
