import instance from "../instanceAxios";

export const getAllFavorisByOne = async (idUser) => {
    try {
        const response = await instance.get(`favorites/${idUser}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}