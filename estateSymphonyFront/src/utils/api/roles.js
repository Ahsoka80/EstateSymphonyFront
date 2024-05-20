import instance from "../instanceAxios";

export const getRoles = async () => {
    try {
        const response = await instance.get('roles');
        return response.data.data;
    } catch (error) {
        console.error('Erreur survenue : ', error.message);
    }
}