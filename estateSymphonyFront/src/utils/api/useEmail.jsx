import { jwtDecode } from 'jwt-decode';

export const useEmail = () => {
    const token = localStorage.getItem('token');
    if (token) {

        const { email } = jwtDecode(token);
        return email;
    }
    return null;
}
