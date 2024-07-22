import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom"
import { getProperty, putProperty } from "../../utils/api/properties";
import * as Yup from 'yup';
import { getUsersByRole } from "../../utils/api/user";
import { Box, FormHelperText, Grid, IconButton } from "@mui/material";
import { FieldArray, Formik } from "formik";
import CustomForm from "../Form/CustomForm";
import { getAllStatuses } from "../../utils/api/statuses";
import { getAllDistricts } from "../../utils/api/districts";
import CustomButton from "../Buttons/CustomButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { deletePhoto, getPhotosByProperty } from "../../utils/api/photos";
import useIcon from "../../utils/hooks/useIcon";


const EstateDashboardUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState({ price: 0, location: '', surface: 0, showerRoom: 0, energising: '', typeEnergic: '', description: '', heatingSystem: '', floor: 0, balcony: 0, parking: 0, rooms: 0, idStatuses: 0, idDistricts: 0, idUsers: 0 });
    const [updateErrors, setUpdateErrors] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [updatePhotosSuccess, setUpdatePhotoSuccess] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [users, setUsers] = useState([]);
    const [photos, setPhotos] = useState([]);
    const booleenNumber = [{ id: 0, name: 'Non' }, { id: 1, name: 'Oui' }];
    const URL_API = `http://127.0.0.1:3000`;
    const closeIcon = useIcon('close', 'yellow', 10, 'rgba(0, 0, 0, 0.5)');
    const energisingList = [{ id: 'A', name: 'A' }, { id: 'B', name: 'B' }, { id: 'C', name: 'C' }, { id: 'D', name: 'D' }, { id: 'E', name: 'E' }, { id: 'F', name: 'F' }, { id: 'G', name: 'G' },]

    useEffect(() => {
        getProperty(id).then(data => { setItem(data); });
        getPhotosByProperty(id).then(data => { setPhotos(data) });
    }, [id])
    useEffect(() => {
        getAllDistricts().then(data => { setDistricts(data); });
        getUsersByRole(4).then(data => { setUsers(data); });
        getAllStatuses().then(data => { setStatuses(data) });
    }, [])


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
        price: Yup.string().required('Ce champ est obligatoire').min(2, 'Le prix ne peut être inférieur à 10'),
        surface: Yup.string().required('Ce champ est obligatoire'),
        floor: Yup.string().required('Ce champ est obligatoire'),
        parking: Yup.string().required('Ce champ est obligatoire'),
        rooms: Yup.string().required('Ce champ est obligatoire'),
        idStatuses: Yup.string().required('Ce champ est obligatoire'),
        idDistricts: Yup.string().required('Ce champ est obligatoire'),
        archived: Yup.string().required('Ce champ est obligatoire'),
    });

    const photosFiltered = (arr1, arr2) => {
        const isDifferent = (obj1, obj2) => {
            return JSON.stringify(obj1) !== JSON.stringify(obj2);
        };

        const onlyInFirst = arr1.filter(obj1 => !arr2.some(obj2 => !isDifferent(obj1, obj2)));
        const onlyInSecond = arr2.filter(obj2 => !arr1.some(obj1 => !isDifferent(obj2, obj1)));

        return [...onlyInFirst, ...onlyInSecond];
    };



    //NAVIGATION
    const handleBack = () => {
        navigate('/dashboard/estates');
    }
    const handleUpdate = async (values) => {
        // console.log('new', values.photos);
        // console.log('old', photos);
        item.photos = photos;
        console.log('item old', item);
        console.log('item new', values);
        setUpdateSuccess('En cours de modification..');
        setUpdatePhotoSuccess('');
        setUpdateErrors('');
        const photoResulted = photosFiltered(photos, values.photos);
        let photosDeleted = 0;
        try {
            if (photoResulted.length > 0) {
                for (let i = 0; i < photoResulted.length; i++) {
                    const onePhoto = photoResulted[i];
                    let response = await deletePhoto(onePhoto.id);
                    (response.message.split(' ')[1] === 'supprimée') ? photosDeleted += 1 : console.log(`Photo ${onePhoto.id} pas supprimée`);
                }
                photosDeleted > 0 ? setUpdatePhotoSuccess(`${photosDeleted} photo(s) supprimée(s)`) : setUpdateErrors('Aucune photo supprimée');
                getPhotosByProperty(id).then(data => { setPhotos(data) });
            }
        } catch (error) {
            console.error('Erreur suppression  : ', error);
        }

        if (
            item.price !== values.price ||
            item.location !== values.location ||
            item.surface !== values.surface ||
            item.showerRoom !== values.showerRoom ||
            item.energising !== values.energising ||
            item.typeEnergic !== values.typeEnergic ||
            item.description !== values.description ||
            item.heatingSystem !== values.heatingSystem ||
            item.floor !== values.floor ||
            item.balcony !== values.balcony ||
            item.parking != values.parking ||
            item.rooms !== values.rooms ||
            item.idStatuses !== values.idStatuses ||
            item.idDistricts !== values.idDistricts ||
            item.archived != values.archived ||
            values.photo.length > 0
        ) {
            setUpdateSuccess('Pas pareil');
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                if (key === 'photo') {
                    for (let j = 0; j < value.length; j++) {
                        formData.append(key, value[j])
                    }
                } else {
                    formData.append(key, values[key]);
                }
            }
            const response = await putProperty(values, id);
            let Successful = response.message.split(' ')[1] === 'modifiée';
            Successful ? setUpdateSuccess(response.message) : setUpdateErrors(response.message);

        } else { setUpdateSuccess('Pas de modifications des données du bien'); }
        // Successful ? handleBack() : '';
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
        archived: item.archived,
        photos: photos,
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
                    onSubmit={handleUpdate}
                >
                    {({ values, handleChange, handleSubmit, errors, setFieldValue }) => {
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
                                                inputType: 'select',
                                                items: energisingList,
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
                                    <FieldArray
                                        name="photo"
                                        render={() => (
                                            <>
                                                <input
                                                    multiple
                                                    type="file"
                                                    id="photo"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        console.log(e.target.files);
                                                        setFieldValue('photo', e.target.files);
                                                    }}
                                                />
                                            </>
                                        )}
                                    />

                                    <FieldArray
                                        name="photos"
                                        render={({ remove }) => (
                                            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                                                {values.photos.map((photo, index) => (
                                                    <Grid item xs={6} sm={3} key={index}>
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                src={photo.photo.startsWith('/public') ? URL_API + photo.photo.substring(7) : URL_API + photo.photo}
                                                                alt={`Photo ${index}`}
                                                                style={{ width: '100%' }}
                                                            />
                                                            <IconButton
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '0',
                                                                    right: '0',
                                                                    color: 'red',
                                                                }}
                                                                onClick={() => remove(index)}
                                                            >
                                                                {closeIcon}
                                                            </IconButton>
                                                        </div>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )}
                                    />
                                    <>
                                        <CustomButton
                                            onClick={handleSubmit}
                                            text={'Modifier'}
                                            style={{ color: 'green' }}
                                            type={'submit'}
                                            size={'large'}
                                            fullwidth={false}
                                            variant={'contained'}
                                            isEnabled={false} //reversed
                                        >
                                        </CustomButton>
                                    </>
                                    <FormHelperText sx={{ color: 'green', marginLeft: 1, justifyContent: "center" }}>{updateSuccess}</FormHelperText>
                                    <FormHelperText sx={{ color: 'green', marginLeft: 1, justifyContent: "center" }}>{updatePhotosSuccess}</FormHelperText>
                                    <FormHelperText sx={{ color: 'red', marginLeft: 1, justifyContent: "center" }}>{updateErrors}</FormHelperText>
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