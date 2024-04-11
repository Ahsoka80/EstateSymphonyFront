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

export const postProperty = async (data) => {
    try {
        //Reconstruction des données du formulaire en format FormData
        const formData = new FormData();
        //Ajout des données du formulaire à l'objet formData
        Object.keys(data).forEach(
            key => {
                if (Array.isArray(data[key])) {
                    data[key].forEach(file => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }
        )
        console.log(formData.values().toArray()[14]);
        // const response = await instance.post(`property/create`, formData);
        // return response.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés de la recherche : ', error);
    }
}