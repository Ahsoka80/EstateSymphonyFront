import instance from "../instanceAxios";

//GET ALL
export const getAllProperties = async () => {
    try {
        const response = await instance.get(`properties`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération de toutes les propriétés : ', error.message);
    }
}
//GET BY SEARCH
export const getPropertiesBySearch = async (data) => {
    try {
        console.log(data);
        const response = await instance.post('propertiesBySearch', data);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés de la recherche : ', error);
    }
}
//GET BY STATUS
export const getPropertiesByStatus = async (id) => {
    try {
        const response = await instance.get(`/propertiesByStatus/${id}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés en fonction de leur status : ', error);
    }
}
//GET ARCHIVED
export const getPropertiesArchived = async () => {
    try {
        const response = await instance.get(`/properties/archived`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération des propriétés en fonction de leur status : ', error);
    }
}
//GET ONE
export const getProperty = async (id) => {
    try {
        const response = await instance.get(`property/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur récupération de la propriété recherchée : ', error);
    }
}
//CREATE
export const postProperty = async (data) => {
    try {
        // //Reconstruction des données du formulaire en format FormData
        const formData = new FormData();
        // //Ajout des données du formulaire à l'objet formData
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
        // console.log(formData.values().toArray()[14]);
        const response = await instance.post(`property/create`, formData);
        return response.data;
    } catch (error) {
        console.error('Erreur création de la propriété : ', error);
    }
}
//UPDATE
export const putProperty = async (data, id) => {
    try {
        const formData = new FormData();
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
        const response = await instance.put(`/property/modify/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Erreur modification de la propriété : ', error);

    }
}
//TO ARCHIVE
export const archiveProperty = async (id) => {
    try {
        const response = await instance.put(`property/archive/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur archivage de la propriété : ', error);
    }
}
//TO RESTORE
export const restoreProperty = async (id) => {
    try {
        const response = await instance.put(`property/restore/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur restauration de la propriété : ', error);
    }
}