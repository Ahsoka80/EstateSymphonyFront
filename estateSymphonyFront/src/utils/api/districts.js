import instance from "../instanceAxios";

export const getAllDistricts = async () => {
    try {
        const response = await instance.get(`districts`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}