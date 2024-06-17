import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees, updateEmployee } from '../../../utils/api/employees';
import CustomButton from '../../Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { IconButton, MenuItem, Select } from '@mui/material';
import { getRoles } from '../../../utils/api/roles';


export default function Employees() {
    const navigation = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles().then(data => { data[2].name = 'Employé'; setRoles(data.filter(role => role.name !== 'User')); });
        getEmployees().then(data => {
            const employeesComplete = data.map((employee) => ({
                ...employee,
                firstname: employee.userEmployees.firstname,
                lastname: employee.userEmployees.lastname,
                email: employee.userEmployees.email,
                phone: employee.userEmployees.phone,
                idRoles: employee.userEmployees.idRoles,
            }));
            setEmployees(employeesComplete);
        });
    }, []);

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            if (newRow !== oldRow) {
                const updatedEmployee = await updateEmployee(newRow, newRow.id);
                return updatedEmployee;
            }
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour des données');
        }
    };

    const handleProcessRowUpdateError = (error) => {
        console.error(error);
    };

    const handleAddNewEmployee = () => {
        navigation('/dashboard/employee/create');
    }

    const handleDelete = async (id) => {
        const response = await deleteEmployee(id);
        console.log(response);
        let Successful = response.message.split(' ')[1] === 'supprimé';
        Successful ? setEmployees(employees.filter(employee => employee.id !== id)) : '';
    }

    const handleDistricts = async (row, newDistrictId) => {
        try {
            console.log(row, newDistrictId);
            const updateDistrict = await udapteEmployeeDistrict(row, row.id);
            setEmployees(employees.map(emp => (emp.id === row.id) ? { ...emp, idDistricts: newDistrictId } : emp))
        } catch (error) {
            console.error('Erreur lors de la mise à jour du quartier', error);
        }
    }
    const handleRole = async (row, newRoleId) => {
        try {
            console.log(row, newRoleId);
            const updatedEmployee = await updateEmployee(row, row.id);
            console.log(updatedEmployee);
            setEmployees(employees.map(emp => (emp.id === row.id ? { ...emp, idRoles: newRoleId } : emp)));
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 30, editable: false, description: 'Identifiant unique de l\'employé' },
        { field: 'firstname', headerName: 'Prénom', width: 130, editable: true },
        { field: 'lastname', headerName: 'Nom', width: 130, editable: true },
        { field: 'name', headerName: 'Surnom', width: 130, editable: true, },
        { field: 'descriptions', headerName: 'Description', width: 130, editable: true, },
        { field: 'email', headerName: 'Email', width: 220, editable: true },
        { field: 'phone', headerName: 'Tél', width: 100, editable: true },
        {
            field: 'roles',
            headerName: 'Role',
            width: 140,
            renderCell: (params) => (
                <Select
                    value={params.row.idRoles}
                    onChange={(event) => handleRole(params.row, event.target.value)}
                    fullWidth
                >
                    {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
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

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </div>
            <div className="AddEmployee">
                <CustomButton
                    onClick={() => { handleAddNewEmployee() }}
                    text={'Ajouter un employé'}
                    color={'info'} />
            </div>
            {/* <div className="AddUser">
                <CustomButton
                    onClick={() => { handleAddNewUser() }}
                    text={'Ajouter un utilisateur'}
                    color={'info'} />
            </div> */}
        </div>
    );
}
