import instance from "../instanceAxios";

export const login = async (data) => {
    const response = await instance.post('login', data);
    return response;
}

export const register = async (data) => {
    const response = await instance.post('user/create', data);
    return response;
}