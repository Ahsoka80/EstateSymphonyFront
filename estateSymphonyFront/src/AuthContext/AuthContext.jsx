// AuthContext.js
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);
        }
    }, [token]);

    const login = (userToken) => {
        setIsLoggedIn(true);
        setToken(userToken);
        sessionStorage.setItem('token', userToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken('');
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export { AuthContext, AuthProvider }