import instance from "../instanceAxios";

export const getUserEmail = async (email) => {
    try {
        const response = await instance.get(`user/email/${email}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}

export const getUserByRole = async (idRoles) => {
    try {
        const response = await instance.get(`users/${idRoles}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}
