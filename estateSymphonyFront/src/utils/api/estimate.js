import instance from "../instanceAxios";

export const getAllEstimateByOne = async (idUser) => {
    try {
        const response = await instance.get(`estimations/${idUser}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}