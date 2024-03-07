import instance from "../instanceAxios";

export const getAllProperties = async () => {
    try {
        console.log("coucou");
        const response = await instance.get(`properties`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}

export const getPropertiesBySearch = async (data) => {
    try {
        const response = await instance.get(`properties/`);
    } catch (error) {
        console.error('Erreur récupération des propriétés de la recherche : ', error);
    }
}