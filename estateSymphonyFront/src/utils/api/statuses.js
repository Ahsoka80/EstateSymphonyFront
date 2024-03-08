import instance from "../instanceAxios";

export const getAllStatuses = async () => {
    try {
        const response = await instance.get(`statuses`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}