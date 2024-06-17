import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom"
import { getUsersByRole } from "../../../utils/api/user";
import { postEmployee } from "../../../utils/api/employees";
import { Box, FormHelperText, IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import * as Yup from 'yup';
import CustomForm from "../../Form/CustomForm";
import CustomButton from "../../Buttons/CustomButton";
import { getRoles } from "../../../utils/api/roles";
import { getAllDistricts } from "../../../utils/api/districts";



const EmployeeCreate = () => {
    const navigation = useNavigate();
    const [creationErrors, setCreationErrors] = useState('');
    const [creationSuccess, setCreationSuccess] = useState('');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getUsersByRole(4).then(data => { setUsers(data); });
        getRoles().then(data => { data[2].name = 'Employé'; data.splice(-1); setRoles(data); });
        getAllDistricts().then(data => { setDistricts(data); });
    }, [])

    //Modification des données utilisateurs et des status pour affichage dans les select
    users.forEach(user => {
        user.name = `${user.firstname} ${user.lastname} (${user.email})`;
    })
    //NAVIGATION
    const handleBack = () => {
        navigation('/dashboard/employeesList');
    }
    //CREATE
    const handleCreate = async (data) => {
        setCreationSuccess('En cours de création..');
        setCreationErrors('');
        let response = await postEmployee(data);
        console.log(response);
        let Successful = response.message.split(' ')[1] === 'créé';
        Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
        Successful ? handleBack() : '';
    }
    const handleAddNewUser = () => {
        navigation('/dashboard/user/create');
    }
    const validationSchema = Yup.object({
        descriptions: Yup.string().notRequired(),
        name: Yup.string().notRequired(),
        idUsers: Yup.string().required(),

    });
    const initialValues = {
        descriptions: '',
        name: '',
    }
    return (
        <>
            <IconButton
                color="info"
                onClick={handleBack}>
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
                                <h2>Création d&apos;un employé</h2>
                                <Form onSubmit={handleSubmit}>
                                    <CustomForm
                                        inputs={[
                                            {
                                                name: 'descriptions',
                                                value: values.descriptions,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Description',
                                                error: errors.descriptions,
                                                required: false,
                                            },
                                            {
                                                name: 'name',
                                                value: values.name,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Surnom',
                                                error: errors.name,
                                                required: false,
                                            },
                                            {
                                                name: 'idUsers',
                                                value: values.idUsers,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Utilisateur',
                                                error: errors.idUsers,
                                                required: true,
                                                inputType: 'select',
                                                items: users
                                            },
                                            {
                                                name: 'idRoles',
                                                value: values.idRoles,
                                                type: 'number',
                                                onChange: handleChange,
                                                label: 'Role',
                                                error: errors.idRoles,
                                                required: true,
                                                inputType: 'select',
                                                items: roles,
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

                                    <>
                                        <CustomButton
                                            onClick={handleSubmit}
                                            text={'Créer'}
                                            style={{ color: 'green' }}
                                            type={'submit'}
                                            size={'large'}
                                            fullwidth={false}
                                            variant={'contained'}
                                        >
                                        </CustomButton>
                                    </>
                                    <div className="AddUser">
                                        <CustomButton
                                            onClick={() => { handleAddNewUser() }}
                                            text={'Ajouter un utilisateur'}
                                            color={'info'} />
                                    </div>

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

export default EmployeeCreate;