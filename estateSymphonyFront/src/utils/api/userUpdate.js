import instance from "../instanceAxios";

export const userUpdate = async (data) => {
    const response = await instance.put('user/modify', data);
    return response;
}