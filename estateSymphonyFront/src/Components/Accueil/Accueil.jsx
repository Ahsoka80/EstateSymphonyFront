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
import { Form, Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import * as Yup from 'yup';
import { getPropertiesBySearch } from '../../utils/api/properties';
import CustomButton from '../Buttons/CustomButton';
import { getAllDistricts } from '../../utils/api/districts';
import { getAllStatuses } from '../../utils/api/statuses';
import { AuthContext } from '../../AuthContext/AuthContext';
import { getAllFavorisByOne } from '../../utils/api/favoris';
import { getUserEmail } from '../../utils/api/user';
import { useEmail } from '../../utils/api/useEmail';
import CustomCard from '../Card/CustomCard';

const validation = Yup.object({
  energising: Yup.string()
    .notRequired()
    .matches(/^[A-G]$/, "Le mot de passe doit contenir une lettre de A à G"),
})

export default function Accueil() {
  const { isLoggedIn } = useContext(AuthContext);
  const [propertiesBySearch, setPropertiesBySearch] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [idUser, setIdUser] = useState('');
  const [favoris, setFavoris] = useState([]);
  const email = useEmail();
  useEffect(() => {
    getAllDistricts()
      .then(data => { setDistricts(data); });
    getAllStatuses().then(data => { setStatuses(data) })
    if (isLoggedIn) {
      getUserEmail(email).then(data => {
        setIdUser(data.id);
      })
      if (idUser !== '') {
        getAllFavorisByOne(idUser).then(data => { setFavoris(data.slice(-3)); })
      }
      getAllFavorisByOne(idUser).then(data => { setFavoris(data); })
    }
  }, [email, idUser, isLoggedIn]);

  statuses.forEach(status => {
    if (status.hidden) {
      status.name = status.sold ? 'Vendu' : 'Loué';
    }
    if (!status.hidden) {
      status.name = status.sold ? 'En vente' : 'A louer';
    }
  })

  const typeEnergicList = [{ id: 'Electrique', name: 'Electrique' }, { id: 'Gaz', name: 'Gaz' }, { id: 'Fioul', name: 'Fioul' },]
  const heatingSystems = [{ id: 'Pompe à chaleur', name: 'Pompe à chaleur' }, { id: 'Panneaux solaires', name: 'Panneaux solaires' }]
  const energisingList = [{ id: 'A', name: 'A' }, { id: 'B', name: 'B' }, { id: 'C', name: 'C' }, { id: 'D', name: 'D' }, { id: 'E', name: 'E' }, { id: 'F', name: 'F' }, { id: 'G', name: 'G' },]

  const handleSearch = async (data) => {
    try {
      setPropertiesBySearch(await getPropertiesBySearch(data));
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }

  let { properties } = useContext(PropertiesContext);
  console.log(properties);
  properties = properties.slice(-4);
  return (
    <>
      <Container>
        <Row>
          <img className='imgAccueil' src="..\src\assets\img\hklkkjndono.jpg" alt="image d'un salon moderne avec des fauteuil blanc" />
          <h1 className='accueil'>Bonjour</h1>
          <Formik enableReinitialize
            validationSchema={validation}
            initialValues={{
              price: '',
              status: '',
              energising: '',
              floor: '',
              parking: '',
              balcony: '',
              rooms: '',
              showerRoom: '',
              surface: '',
              typeEnergic: '',
              district: '',
              heatingSystem: '',
            }}
            onSubmit={handleSearch}
          >
            {({ values, handleChange, handleSubmit, handleReset, errors }) => {
              return (
                <Box>
                  <Form onSubmit={handleSubmit}>
                    <CustomForm
                      inputs={[
                        //#region PRICE
                        {
                          name: 'price',
                          value: values.price,
                          type: 'slider',
                          onChange: handleChange,
                          label: 'Prix',
                          error: errors.price,
                          required: false,
                          min: 400,
                          max: 100000,
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
                          inputType: 'select',
                          items: energisingList,
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
                          onClick: handleReset
                        },
                        //#endregion
                      ]}
                    ></CustomForm>
                    <CustomButton
                      onClick={handleSubmit}
                      text={'Rechercher'}
                      style={{ color: 'blue' }}
                      type={'submit'}
                      size={'large'}
                      fullWidth={false}
                      variant={'contained'}
                    >
                    </CustomButton>
                  </Form>
                  {
                    (propertiesBySearch) ?
                      <>
                        <Typography sx={{ marginTop: 5, fontSize: 25 }} color={'green'}>Résultat de la recherche </Typography>
                        <Col className='card'>
                          {propertiesBySearch.map((item, index) => {
                            return (
                              <CustomCard
                                {...item}
                                key={index}
                                item={item}
                              >
                              </CustomCard>
                            )
                          })}
                        </Col>
                      </>

                      :
                      <>
                        <Typography fullWidth color={'error'} bgcolor={'yellow'} sx={{ margin: 10, fontSize: 25 }}>
                          Aucune propriété correspond à votre recherche
                        </Typography>
                      </>
                  }
                </Box>
              )
            }}
          </Formik>

        </Row>
        <Row className='rowLastAnnoncement'>

          <Col className='mt-3'>
            <Typography fullWidth color={'blue'} sx={{ marginTop: 7, fontSize: 25 }}>
              Les dernières annonces
            </Typography>
          </Col>

          <Col className='card'>
            {properties.map((item, index) => {
              return (
                <CustomCard
                  {...item}
                  key={index}
                  item={item}
                >
                </CustomCard>)
            })}
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography color={'orange'} sx={{ fontSize: 25 }}>
              Favoris
            </Typography>
          </Col>
          <Col>
            {
              (favoris && favoris.length !== 0) ?
                <Col className='card'>
                  {favoris.map((item) => {
                    return (
                      <Card key={item.id} sx={{ width: 245, height: 350 }}>
                        <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        </Link>
                        <CardActions>
                          <Button size="small">Share</Button>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </Card>

                    )
                  })}
                </Col>
                :
                <>
                  <Typography variant='body2' color={'orangered'} sx={{ marginBottom: 10 }}>
                    Veuillez vous connecter/inscrire pour avoir des favoris
                  </Typography>
                </>
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}
