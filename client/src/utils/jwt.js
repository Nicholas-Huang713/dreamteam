export const getJwt = () => {
    return localStorage.getItem('token');
}

export const removeJwt = () => {
    return localStorage.removeItem('token');
}

