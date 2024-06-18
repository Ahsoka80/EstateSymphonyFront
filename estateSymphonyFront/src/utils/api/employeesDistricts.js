import instance from "../instanceAxios";

//GET EMPLOYEE-DISTRICT by idEmployees
export const getEmployeeDistrict = async (idEmployees) => {
    try {
        const response = await instance.get(`/employeesDistrictsByIdEmployee/${idEmployees}`);
        return response.data;
    } catch (error) {
        console.error('Erreur de recherche de employeesDistricts d\'un employé : ', error.message);
    }
}
//UPDATE EMPLOYEE-DISTRICT by idEmployees
export const updateEmployeeDistrict = async (data, id) => {
    try {
        data.idEmployees = data.employees_EmployeesDistrict[0].idEmployees;
        data.id = data.employees_EmployeesDistrict[0].id
        const response = await instance.put(`/employeesDistricts/modify/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur de la modification d\'un employé-quartier : ', error.message);
    }
}
//CREATE EMPLOYEE-DISTRICT
export const createEmployeeDistrict = async (data) => {
    try {
        const response = await instance.post('/employeesDistricts/create', data);
        return response.data;
    } catch (error) {
        console.error('Erreur de la création d\'un employé-quartier : ', error.message);
    }
}