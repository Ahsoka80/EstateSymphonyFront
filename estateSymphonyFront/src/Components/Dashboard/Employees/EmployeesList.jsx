import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees, updateEmployee } from '../../../utils/api/employees';
import CustomButton from '../../Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { FormHelperText, IconButton, MenuItem, Select } from '@mui/material';
import { getRoles } from '../../../utils/api/roles';
import { getAllDistricts } from '../../../utils/api/districts';
import { createEmployeeDistrict, updateEmployeeDistrict } from '../../../utils/api/employeesDistricts';


export default function Employees() {
    const navigation = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [creationErrors, setCreationErrors] = useState('');
    const [creationSuccess, setCreationSuccess] = useState('');

    useEffect(() => {
        getAllDistricts().then(data => { setDistricts(data); });
        getRoles().then(data => { data[2].name = 'Employé'; setRoles(data.filter(role => role.name !== 'User')); });
        getEmployees().then(data => {
            console.log(data);
            const employeesComplete = data.map((employee) => ({
                ...employee,
                firstname: employee.userEmployees.firstname,
                lastname: employee.userEmployees.lastname,
                email: employee.userEmployees.email,
                phone: employee.userEmployees.phone,
                idRoles: employee.userEmployees.idRoles,
                idDistricts: employee.employees_EmployeesDistrict.length > 0 ? employee.employees_EmployeesDistrict[0].idDistricts : '',
            }));
            setEmployees(employeesComplete);
        });
    }, []);

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            if (newRow !== oldRow) {
                const response = await updateEmployee(newRow, newRow.id);
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

    const handleAddNewEmployee = () => {
        navigation('/dashboard/employee/create');
    }

    const handleDelete = async (id) => {
        setCreationErrors('');
        setCreationSuccess('Suppression de l\'employé..');
        const response = await deleteEmployee(id);
        console.log(response);
        let Successful = response.message.split(' ')[1] === 'supprimé';
        Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
        Successful ? setEmployees(employees.filter(employee => employee.id !== id)) : '';
    }

    const handleDistricts = async (row, newDistrictId) => {
        try {
            setCreationErrors('');
            setCreationSuccess('Modification de l\'affectation..');
            row.idDistricts = newDistrictId;
            if (row.employees_EmployeesDistrict.length !== 0) {
                const response = await updateEmployeeDistrict(row, row.employees_EmployeesDistrict[0].id);
                let Successful = response.message.split(' ')[1] === 'modifié';
                Successful ? setCreationSuccess('Affectation modifiée') : setCreationErrors(response.message);
                Successful ? setEmployees(employees.map(emp => (emp.id === row.id) ? { ...emp, idDistricts: newDistrictId } : emp)) : '';
            } else {
                const createEmpDis = await createEmployeeDistrict({ idDistricts: newDistrictId, idEmployees: row.id })
                setEmployees(employees.map(emp => (emp.id === row.id) ? { ...emp, idDistricts: newDistrictId } : emp))
                setCreationSuccess(createEmpDis.message);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du quartier', error);
            setCreationErrors(error.message)
        }
    }
    const handleRole = async (row, newRoleId) => {
        try {
            setCreationErrors('');
            setCreationSuccess('Modification du role..');
            row.idRoles = newRoleId;
            const response = await updateEmployee(row, row.id);
            let Successful = response.message.split(' ')[1] === 'modifié';
            Successful ? setEmployees(employees.map(emp => (emp.id === row.id ? { ...emp, idRoles: newRoleId } : emp))) : '';
            Successful ? setCreationSuccess(response.message) : setCreationErrors(response.message);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle', error);
            setCreationErrors(error.message);
        }
    };

    const columns = [
        // { field: 'ID', headerName: 'ID', width: 30, editable: false, description: 'Identifiant unique de l\'employé', renderCell: (params, index) => <p>{index}</p> },
        { field: 'firstname', headerName: 'Prénom', width: 100, editable: true },
        { field: 'lastname', headerName: 'Nom', width: 100, editable: true },
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
            field: 'districts',
            headerName: 'Affectation',
            width: 200,
            renderCell: (params) => (
                <Select
                    value={params.row.idDistricts}
                    onChange={(event) => handleDistricts(params.row, event.target.value)}
                    fullWidth
                >
                    {districts.map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                            {district.name}
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
