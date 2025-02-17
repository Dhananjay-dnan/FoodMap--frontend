// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for token in localStorage on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            console.log(user);
            // Optionally, decode the token to get user info
            //  const decodedUser = jwtDecode(token); // Use jwt-decode library if needed
            //  setUser(decodedUser);
            //  console.log(decodedUser.sub);
        }
    }, []);

    const login = (userData) => {
        console.log(userData)
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userId', userData.id);
        console.log("true")
    };

    const logout = () => {
        
        console.log("token removed")
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        console.log("token removed")
     // Remove token
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};