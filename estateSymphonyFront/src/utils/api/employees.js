import instance from "../instanceAxios";

//GET ALL
export const getEmployees = async () => {
    try {
        const response = await instance.get(`employees`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération de tous les employés : ', error.message);
    }
}
//UPDATE EMPLOYEE
export const updateEmployee = async (data, id) => {
    try {
        console.log(data);
        const response = await instance.put(`/employee/modify/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur de modification d\'un employé : ', error.message);
    }
}
//DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
    try {
        const response = await instance.delete(`/employee/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur de modification d\'un employé : ', error.message);
    }
}
//CREATE EMPLOYEE
export const postEmployee = async (data) => {
    try {
        const response = await instance.post('/employee/create', data);
        return response.data;
    } catch (error) {
        console.error('Erreur de création d\'un employé : ', error.message);
    }
}