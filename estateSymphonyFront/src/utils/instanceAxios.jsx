import axios from 'axios';

const URL_API = 'http://127.0.0.1:3000/';
const instance = axios.create({
    baseURL: URL_API,
    headers: { "Content-Type": 'application/json' }
})

instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
}, (errors) => {
    return Promise.reject(errors);
})

instance.interceptors.response.use((res) => {
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
    }
    return res;
}, (errors) => {
    console.log(errors.response.data.message);
    if (errors.response.status === 401) {
        console.log('401 Unauthorized')
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    if (errors.response.status === 400) {
        console.log('400 Bad Request')
        localStorage.removeItem('token');
    }
    return errors.response.data.message;
})

export default instance