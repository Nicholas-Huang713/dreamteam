import { useState, useEffect } from 'react';
import { getJwt } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const jwt = getJwt();
        if (!jwt) {
            navigate('/');
        }
        setToken(jwt)

        return (() => setToken(undefined))
    }, [navigate]);

    return (
        <>
            {token === undefined ?
                <div>Loading...</div> :
                { children }
            }
        </>
    );
}

export default PrivateRoute;
