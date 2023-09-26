// useAuth.js
import { useState, useEffect } from 'react';
import { getJwt } from '../utils/jwt';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const jwt = getJwt();
    useEffect(() => {

        if (!jwt) {
            // navigate('/')
            return
        }
        setIsAuthenticated(true)

        return (() => setIsAuthenticated(false))
    }, [navigate, jwt]);

    return { isAuthenticated };
}
