import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import CustomButton from '../../Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { FormHelperText, IconButton } from '@mui/material';
import { deleteDistrict, getAllDistricts, updateDistrict } from '../../../utils/api/districts';

export default function Districts() {
    const navigation = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [creationErrors, setCreationErrors] = useState('');
    const [creationSuccess, setCreationSuccess] = useState('');

    useEffect(() => {
        getAllDistricts().then(data => { setDistricts(data); });
    }, []);

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            if (newRow !== oldRow) {
                const response = await updateDistrict(newRow, newRow.id);
                let Successful = response.message.split(' ')[1] === 'modifié';
                Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
                return response.data;
            }
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour des données');
        }
    };

    const handleProcessRowUpdateError = (error) => {
        console.error(error);
        setCreationErrors(error);
    };

    const handleAddNewDistrict = () => {
        navigation('/dashboard/district/create');
    }

    const handleDelete = async (id) => {
        setCreationErrors('');
        setCreationSuccess('Suppression du quartier..');
        const response = await deleteDistrict(id);
        console.log(response);
        let Successful = response.message.split(' ')[1] === 'supprimé';
        Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
        Successful ? setDistricts(districts.filter(district => district.id !== id)) : '';
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 30, editable: false, description: 'Identifiant unique de l\'employé' },
        { field: 'name', headerName: 'Nom', width: 200, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id)}><GridDeleteIcon /></IconButton>
            ),
        }
    ];

    return (
        <div>

            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={districts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </div>
            <div className="AddDistrict">
                <CustomButton
                    onClick={() => { handleAddNewDistrict() }}
                    text={'Ajouter un quartier'}
                    color={'info'} />
            </div>
            <FormHelperText sx={{ color: 'green', marginLeft: 1, justifyContent: "center" }}>{creationSuccess}</FormHelperText>
            <FormHelperText sx={{ color: 'red', marginLeft: 1, justifyContent: "center" }}>{creationErrors}</FormHelperText>

            {/* <div className="AddUser">
            <CustomButton
                onClick={() => { handleAddNewUser() }}
                text={'Ajouter un utilisateur'}
                color={'info'} />
        </div> */}
        </div>
    );
}

