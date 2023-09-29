// useAuth.js
import { useState, useEffect } from 'react';
import { getJwt } from '../utils/jwt';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const jwt = getJwt();
    useEffect(() => {

        if (!jwt) {
            return;
        }
        setIsAuthenticated(true)

        return (() => setIsAuthenticated(false))
    }, [jwt]);

    return { isAuthenticated };
}
