import instance from "../instanceAxios";

//USER BY EMAIL
export const getUserEmail = async (email) => {
    try {
        const response = await instance.get(`user/email/${email}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}
//USERS BY ROLE
export const getUsersByRole = async (idRoles) => {
    try {
        const response = await instance.get(`users/${idRoles}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}
//USERS ALL
export const getUsers = async () => {
    try {
        const response = await instance.get('users');
        return response;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}