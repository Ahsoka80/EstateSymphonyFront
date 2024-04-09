import instance from "../instanceAxios";

export const getAllProperties = async () => {
    try {
        const response = await instance.get(`properties`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}

export const getPropertiesBySearch = async (data) => {
    try {
        console.log(data);
        const response = await instance.post('propertiesBySearch', data);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés de la recherche : ', error);
    }
}

export const getProperty = async (id) => {
    try {
        const response = await instance.get(`property/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés de la recherche : ', error);
    }
}