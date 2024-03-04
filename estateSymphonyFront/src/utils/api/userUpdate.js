import instance from "../instanceAxios";

export const userUpdate = async (data) => {
    const response = await instance.put('user/modify', data);
    return response;
}
export const userPasswordUpdate = async (data) => {
    console.log('coucou');
    const response = await instance.put('user/modifyPassword', data);
    return response;
}