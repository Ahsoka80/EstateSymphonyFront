import instance from "../instanceAxios";

export const getProperties = async () => {
    try {
        console.log("coucou");
        const response = await instance.get(`properties`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}