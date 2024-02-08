import instance from "../instanceAxios";

export const login = async (data) => {
    const response = await instance.post('login', data);
    return response;
}