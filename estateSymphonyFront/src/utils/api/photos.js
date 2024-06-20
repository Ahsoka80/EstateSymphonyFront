import instance from "../instanceAxios";

//GET ALL
export const getPhotosByProperty = async (id) => {
    try {
        const response = await instance.get(`/photosByProperty/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération de toutes les photos d\'une propriété : ', error.message);
    }
}