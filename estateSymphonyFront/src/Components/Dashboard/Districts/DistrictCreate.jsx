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
import { getAllDistricts, postDistrict } from "../../../utils/api/districts";



const DistrictCreate = () => {
    const navigation = useNavigate();
    const [creationErrors, setCreationErrors] = useState('');
    const [creationSuccess, setCreationSuccess] = useState('');

    //NAVIGATION
    const handleBack = () => {
        navigation('/dashboard/districts');
    }
    //CREATE
    const handleCreate = async (data) => {
        setCreationSuccess('En cours de création..');
        setCreationErrors('');
        let response = await postDistrict(data);
        console.log(response);
        let Successful = response.message.split(' ')[1] === 'créé';
        Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
        Successful ? handleBack() : '';
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
    });
    const initialValues = {
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
                                <h2>Création d&apos;un quartier</h2>
                                <Form onSubmit={handleSubmit}>
                                    <CustomForm
                                        inputs={[
                                            {
                                                name: 'name',
                                                value: values.name,
                                                type: 'text',
                                                onChange: handleChange,
                                                label: 'Nom du quartier',
                                                error: errors.name,
                                                required: false,
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

export default DistrictCreate;