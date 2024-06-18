import instance from "../instanceAxios";

//GET ALL
export const getAllDistricts = async () => {
    try {
        const response = await instance.get(`districts`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue à la récupération de tous les quartiers : ', error.message);
    }
}
//CREATE
export const postDistrict = async (data) => {
    try {
        const response = await instance.post('district/create', data);
        return response.data;
    } catch (error) {
        console.error('Erreur survenue lors de la création du quartier : ', error.message);
    }
}
//UPDATE
export const updateDistrict = async (data, id) => {
    try {
        const response = await instance.put(`/district/modify/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur survenue lors de la modification du quartier : ', error.message);
    }
}
//DELETE
export const deleteDistrict = async (id) => {
    try {
        const response = await instance.delete(`/district/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur survenue lors de la suppression du quartier : ', error.message);
    }
}