// useAuth.js
import { useState, useEffect } from 'react';
import { getJwt } from '../utils/jwt';
export function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const jwt = getJwt();
        if (!jwt) {
            return;
        }
        setIsAuthenticated(true)

        return (() => setIsAuthenticated(false))
    }, []);

    return { isAuthenticated };
}
