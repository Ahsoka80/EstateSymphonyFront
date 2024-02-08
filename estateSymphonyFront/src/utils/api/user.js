import instance from "../instanceAxios";

export const getUserEmail = async (email) => {
    try {
        const response = await instance.get(`user/email/${email}`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}