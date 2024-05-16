import './Dashboard.css'
import { Form, useNavigate } from "react-router-dom";
import { getAllDistricts } from "../../utils/api/districts";
import { getUserByRole } from "../../utils/api/user";
import { getAllStatuses } from "../../utils/api/statuses";
import { useEffect, useState } from "react";
import { postProperty } from "../../utils/api/properties";
import * as Yup from 'yup';
import CustomButton from "../Buttons/CustomButton";
import { Box, FormHelperText, IconButton } from "@mui/material";
import CustomForm from "../Form/CustomForm";
import { Formik } from "formik";
import ArrowBack from "@mui/icons-material/ArrowBack";



const EstateDashboardCreate = () => {

    const navigate = useNavigate();
    const [creationErrors, setCreationErrors] = useState('');
    const [creationSuccess, setCreationSuccess] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [users, setUsers] = useState([]);
    const booleenNumber = [{ id: 0, name: 'Non' }, { id: 1, name: 'Oui' }];
    //USE EFFECT
    useEffect(() => {
        getAllDistricts().then(data => { setDistricts(data); });
        getUserByRole(4).then(data => {
            setUsers(data);
        });
        getAllStatuses().then(data => { setStatuses(data) })
    }, [])

    //Modification des données utilisateurs et des status pour affichage dans les select
    users.forEach(user => {
        user.name = `${user.firstname} ${user.lastname} (${user.email})`;
    })
    statuses.forEach(status => {
        if (status.hidden) {
            status.name = status.sold ? 'Vendu' : 'Loué';
        }
        if (!status.hidden) {
            status.name = status.sold ? 'En vente' : 'A louer';
        }
    })

    //NAVIGATION
    const handleBack = () => {
        navigate('/dashboard/estates');
    }
    //HANDLE CREATE
    const handleCreate = async (values) => {
        setCreationSuccess('En cours de création..');
        setCreationErrors('');
        // let formData = new FormData();
        // values.map((item)=>{

        // })
        // Envoyer les données au serveur, y compris les noms des images
        // console.log(values);
        let message = await postProperty(values);
        let Successful = message.message.split(' ')[1] === 'créée';
        Successful ? setCreationSuccess(message.message) : setCreationErrors(message.message);
        Successful ? handleBack() : '';
    }

    //VALIDATION SCHEMA
    const validationSchema = Yup.object({
        price: Yup.string()
            .required('Ce champ est obligatoire')
            .min(2, 'Le prix ne peut être inférieur à 10'),
        surface: Yup.string().required('Ce champ est obligatoire'),
        floor: Yup.string().required('Ce champ est obligatoire'),
        parking: Yup.string()
            .required('Ce champ est obligatoire'),
        rooms: Yup.string().required('Ce champ est obligatoire'),
        idStatuses: Yup.string().required('Ce champ est obligatoire'),
        idDistricts: Yup.string().required('Ce champ est obligatoire'),
        archived: Yup.string()
            .required('Ce champ est obligatoire'),
    });


    //INITIAL VALUES
    const initialValues = {
        price: 500,
        location: 'Appartement',
        surface: 50,
        showerRoom: 1,
        energising: 'C',
        typeEnergic: 'Gaz',
        description: '',
        heatingSystem: 'Pompe à chaleur',
        floor: 1,
        balcony: 0,
        parking: false,
        rooms: 3,
        idStatuses: statuses[0]?.id,
        idDistricts: districts[0]?.id,
        archived: false,
        // images: [],
    }
    return (
        <>
            <IconButton
                color="info"
                onClick={handleBack}
            >
                <ArrowBack />
            </IconButton>
            {
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleCreate}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <Box sx={{ '& button': { marginTop: 2 } }}>
                                <h2>Création d&apos;un bien immobilier</h2>
                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                                value: values.parking ? 1 : 0,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Place de parking',
                                                error: errors.parking,
                                                required: true,
                                                inputType: 'select',
                                                items: booleenNumber,
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
                                            {
                                                name: 'archived',
                                                value: values.archived ? 1 : 0,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Archivée',
                                                error: errors.archived,
                                                required: true,
                                                inputType: 'select',
                                                items: booleenNumber,
                                            },
                                            // {
                                            //     name: 'idUsers',
                                            //     value: values.idUsers,
                                            //     type: 'number',
                                            //     onChange: handleChange,
                                            //     label: 'Propriétaire',
                                            //     error: errors.idUsers,
                                            //     required: true,
                                            //     inputType: 'select',
                                            //     items: users,
                                            // },
                                        ]}
                                    />


                                    {/* /// PROBLEME DE MULTER INSERTION DES PHOTOS : En attente de solution côté API */}

                                    {/* <FieldArray
                                name="images"
                                render={({ push, remove }) => (
                                    <>
                                        <input
                                            type="file"
                                            id="images"
                                            accept="image/*"
                                            onChange={(event) => {
                                                push(...event.currentTarget.files);
                                            }}
                                        />

                                    </>)} /> */}


                                    <>
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
                                    </>
                                    <FormHelperText sx={{ color: 'green', marginLeft: 1, justifyContent: "center" }}>{creationSuccess}</FormHelperText>
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

export default EstateDashboardCreate;