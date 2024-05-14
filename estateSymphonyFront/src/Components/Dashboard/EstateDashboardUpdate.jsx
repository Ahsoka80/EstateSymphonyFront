import { useContext, useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom"
import { getProperty, putProperty } from "../../utils/api/properties";
import * as Yup from 'yup';
import { AuthContext } from "../../AuthContext/AuthContext";
import { getUserByRole } from "../../utils/api/user";
import { Box, FormHelperText } from "@mui/material";
import { Formik, useFormik } from "formik";
import CustomForm from "../Form/CustomForm";
import { getAllStatuses } from "../../utils/api/statuses";
import { getAllDistricts } from "../../utils/api/districts";
import CustomButton from "../Buttons/CustomButton";


const EstateDashboardUpdate = () => {
    const { id } = useParams();
    const { isLoggedIn } = useContext(AuthContext);
    const [item, setItem] = useState({ price: 0, location: '', surface: 0, showerRoom: 0, energising: '', typeEnergic: '', description: '', heatingSystem: '', floor: 0, balcony: 0, parking: 0, rooms: 0, idStatuses: 0, idDistricts: 0, idUsers: 0 });
    const [creationErrors, setcreationErrors] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [users, setUsers] = useState([]);
    const [updateEnabled, setUpdateEnabled] = useState(false);

    console.log(isLoggedIn);
    useEffect(() => {
        getAllDistricts()
            .then(data => {
                setDistricts(data);
            });
        getProperty(id).then(data => {
            setItem(data);
            console.log(data);
        });
        getUserByRole(4).then(data => {
            setUsers(data);
        });
        getAllStatuses().then(data => { setStatuses(data) })
    }, [id])


    // useEffect(() => {
    //     if (item != Formik.values) {
    //         setUpdateEnabled(true);
    //     } else {
    //         setUpdateEnabled(false);
    //     }
    //     console.log(updateEnabled);
    // }, [Formik.values])

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

    //Validation des champs du formulaire de modification d'un bien
    const validationSchema = Yup.object({
        price: Yup.string()
            .required('Ce champs est obligatoire')
            .min(2, 'Le prix ne peut être inférieur à 10'),
        surface: Yup.string().required('Ce champs est obligatoire'),
        floor: Yup.string().required('Ce champs est obligatoire'),
        parking: Yup.string().required('Ce champs est obligatoire'),
        rooms: Yup.string().required('Ce champs est obligatoire'),
        idStatuses: Yup.string().required('Ce champs est obligatoire'),
        idDistricts: Yup.string().required('Ce champs est obligatoire'),
        password: Yup.string()
            .required('Ce champ est obligatoire')
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Le mot de passe doit contenir au moins 1 minuscule et 1 majuscule")
            .matches(/\d/, "Le mot de passe doit contenir au moins 1 chiffre")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Le mot de passe doit contenir au moins 1 caractère spécial")
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    })
    const handleUpdate = async (values) => {
        console.log(values);
        // let formData = new FormData();
        // values.map((item)=>{

        // })
        // Envoyer les données au serveur, y compris les noms des images
        // console.log(values);
        let message = await putProperty(values, id);
        // console.log(message.message);
        setcreationErrors(message.message);
    }

    const initialValues = {
        price: item.price,
        location: item.location,
        surface: item.surface,
        showerRoom: item.showerRoom,
        energising: item.energising,
        typeEnergic: item.typeEnergic,
        description: item.description,
        heatingSystem: item.heatingSystem,
        floor: item.floor,
        balcony: item.balcony,
        parking: item.parking,
        rooms: item.rooms,
        idStatuses: item.idStatuses,
        idDistricts: item.idDistricts,
        // idUsers: item.idUsers,
    }
    return (
        <>
            {
                <Formik
                    // validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleUpdate}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <Box sx={{ '& button': { marginTop: 2 } }}>
                                <h2>Modification d&apos;un bien immobilier</h2>
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
                                            {
                                                name: 'idUsers',
                                                value: values.idUsers,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Propriétaire',
                                                error: errors.idUsers,
                                                required: true,
                                                inputType: 'select',
                                                items: users,
                                            },
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
                                            text={'Modifier'}
                                            style={{ color: 'white' }}
                                            type={'submit'}
                                            size={'large'}
                                            fullwidth={false}
                                            variant={'contained'}
                                            isEnabled={updateEnabled}
                                        >
                                        </CustomButton>
                                    </>
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

export default EstateDashboardUpdate