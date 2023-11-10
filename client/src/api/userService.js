import { getJwt } from "../utils/jwt";
import axios from 'axios';

const userApi = '/api/users';
const getUserApi = `${userApi}/getuser`;
export const newUser = `${userApi}/new`;
export const loginUser = `${userApi}/login`;
export const createTeam = `${userApi}/createteam`;
export const addPlayer = `${userApi}/addplayer`;
export const removePlayer = `${userApi}/removeplayer`;
export const saveAffiliation = `${userApi}/saveaffiliation`;
export const getOwnedTeams = `${userApi}/getownedteams`;

export const getUser = async () => {
    const jwt = getJwt();
    const res = await axios({
        url: getUserApi,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
    })
    return res.data;
};

