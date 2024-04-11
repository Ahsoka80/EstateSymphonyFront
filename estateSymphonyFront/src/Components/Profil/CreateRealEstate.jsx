import { Form, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormHelperText, IconButton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useEmail } from "../../utils/api/useEmail";
import { getUserEmail } from "../../utils/api/user";
import { ErrorMessage, FieldArray, Formik } from "formik";
import * as Yup from 'yup';
import CustomForm from "../Form/CustomForm";
import { getAllDistricts } from "../../utils/api/districts";
import { getAllStatuses } from "../../utils/api/statuses";
import CustomButton from "../Buttons/CustomButton";
import { postProperty } from "../../utils/api/properties";

const CreateRealEstate = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = useEmail();
    const [user, setUser] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [creationErrors, setcreationErrors] = useState('');

    useEffect(() => {
        getAllDistricts()
            .then(data => { setDistricts(data); });
        getAllStatuses().then(data => { setStatuses(data) })
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setUser(data);
                if (data.idRoles > 3) { console.log('Utilisateur pas autorisé à être ici..'); navigate('/'); }
            })
        } else {
            console.log('Utilisateur pas connecté, retour page d\'acceuil');
            navigate('/');
        }
    }, [email, isLoggedIn, navigate]);

    statuses.forEach(status => {
        if (status.hidden) {
            status.name = status.sold ? 'Vendu' : 'Loué';
        }
        if (!status.hidden) {
            status.name = status.sold ? 'En vente' : 'A louer';
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
    const handleCreate = async (values) => {
        // Envoyer les données au serveur, y compris les noms des images
        console.log(values);
        let message = await postProperty(values);
        console.log(message.message);
        setcreationErrors(message.message);
    }

    const initialValues = {
        price: 500,
        location: '',
        surface: 50,
        showerRoom: 1,
        energising: 'C',
        typeEnergic: 'Gaz',
        description: '',
        heatingSystem: 'Pompe à chaleur',
        floor: 1,
        balcony: 0,
        parking: 1,
        rooms: 3,
        idStatuses: 2,
        idDistricts: 81,
        images: [],
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
                <Formik
                    // validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleCreate}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <Box sx={{ '& button': { marginTop: 2 } }}>
                                <h2>Création d&apos;un bien immobilier</h2>
                                <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                                    <CustomForm
                                        inputs={[
                                            {
                                                name: 'price',
                                                value: values.price,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Prix',
                                                error: errors.price,
                                                required: true,
                                                placeholder: 'Prix de vente ou de location (charges comprises)',
                                            },
                                            {
                                                name: 'location',
                                                value: values.location,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Location',
                                                error: errors.location,
                                                required: false,
                                                placeholder: 'Appartement ou Maison',
                                            },
                                            {
                                                name: 'surface',
                                                value: values.surface,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Surface',
                                                error: errors.surface,
                                                required: true,
                                                placeholder: 'Surface du bien',
                                            },
                                            {
                                                name: 'showerRoom',
                                                value: values.showerRoom,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Salle de bain',
                                                error: errors.showerRoom,
                                                required: false,
                                                placeholder: 'Nombre de salle d\'eau',
                                            },
                                            {
                                                name: 'energising',
                                                value: values.energising,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Classe énergétique',
                                                error: errors.energising,
                                                required: false,
                                                placeholder: 'A à G',
                                            },
                                            {
                                                name: 'typeEnergic',
                                                value: values.typeEnergic,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Type de chauffage',
                                                error: errors.typeEnergic,
                                                required: false,
                                                placeholder: 'Gaz, lectrique ou Fioul',
                                            },
                                            {
                                                name: 'description',
                                                value: values.description,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Description du bien',
                                                error: errors.description,
                                                required: false,
                                                placeholder: '255 caractères maximum',
                                            },
                                            {
                                                name: 'heatingSystem',
                                                value: values.heatingSystem,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Systeme de chauffage',
                                                error: errors.heatingSystem,
                                                required: false,
                                            },
                                            {
                                                name: 'floor',
                                                value: values.floor,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Etage du bien',
                                                error: errors.floor,
                                                required: true,
                                            },
                                            {
                                                name: 'balcony',
                                                value: values.balcony,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Nombre de balcons',
                                                error: errors.balcony,
                                                required: false,
                                            },
                                            {
                                                name: 'parking',
                                                value: values.parking,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Place de parking',
                                                error: errors.parking,
                                                required: true,
                                            },
                                            {
                                                name: 'rooms',
                                                value: values.rooms,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Nombre de pièces',
                                                error: errors.rooms,
                                                required: true,
                                            },
                                            {
                                                name: 'idStatuses',
                                                value: values.idStatuses,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Etat (En vente, en location, vendu ou loué)',
                                                error: errors.idStatuses,
                                                required: true,
                                                inputType: 'select',
                                                items: statuses,
                                            },
                                            {
                                                name: 'idDistricts',
                                                value: values.idDistricts,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Quartier',
                                                error: errors.idDistricts,
                                                required: true,
                                                inputType: 'select',
                                                items: districts,
                                            },
                                        ]}
                                    />
                                    <FieldArray
                                        name="images"
                                        render={({ push, remove }) => (
                                            <>
                                                <input
                                                    type="file"
                                                    id="images"
                                                    name="images"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(event) => {
                                                        push(...event.currentTarget.files);
                                                    }}
                                                />

                                            </>)} />
                                    <CustomButton
                                        onClick={handleSubmit}
                                        text={'Créer'}
                                        style={{ color: 'white' }}
                                        type={'submit'}
                                        size={'large'}
                                        fullwidth={false}
                                        variant={'contained'}
                                    >
                                    </CustomButton>
                                    <FormHelperText sx={{ color: 'red', marginLeft: 1, justifyContent: "center" }}>{creationErrors}</FormHelperText>
                                </Form>
                            </Box>

                        )
                    }}
                </Formik>
            }
        </>
    )
}
export default CreateRealEstate