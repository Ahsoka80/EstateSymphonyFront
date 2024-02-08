import { createContext, useEffect, useState } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const loginIn = (userToken) => {
        setIsLoggedIn(true);
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }