import { getJwt } from "../utils/jwt";
import axios from 'axios';

const userApi = '/api/users';
const articleApi = '/api/articles';
const getUserApi = `${userApi}/getuser`;
export const newUser = `${userApi}/new`;
export const loginUser = `${userApi}/login`;
export const createTeam = `${userApi}/createteam`;
export const addPlayer = `${userApi}/addplayer`;
export const removePlayer = `${userApi}/removeplayer`;
export const saveAffiliation = `${userApi}/saveaffiliation`;
export const updateUser = `${userApi}/updateuser`;
export const getOwnedTeams = `${userApi}/getownedteams`;
export const playGame = `${userApi}/playgame`;
export const getGamesPlayed = `${userApi}/getgamesplayed`;
export const getTopGames = `${userApi}/gettopgames`;

export const getTeamHighlights = `${articleApi}/teamhighlights`;

export const getUser = async () => {
    const jwt = getJwt();
    const res = await axios({
        url: getUserApi,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
    })
    return res.data;
};

