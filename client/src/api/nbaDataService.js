import axios from 'axios';

const rapidApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TANK01_KEY,
    'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
}

export const fetchPlayerData = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo',
        params: {
            playerName: query,
            statsToGet: 'averages'
        },
        headers: rapidApiHeaders
    };

    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTeamSchedule = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeamSchedule',
        params: {
            teamAbv: query,
            season: '2024'
        },
        headers: rapidApiHeaders
    };

    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const fetchTeamRoster = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeamRoster',
        params: {
            teamAbv: query,
            statsToGet: 'averages'
        },
        headers: rapidApiHeaders
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchAllTeams = async () => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams',
        params: {
            schedules: 'false',
            rosters: 'false',
            topPerformers: 'false',
            teamStats: 'false',
            statsToGet: 'averages'
        },
        headers: rapidApiHeaders
    };

    try {
        const response = await axios.request(options);
        // if (response.data.length > 0) {

        // console.log(response.data)
        return response.data;

        // }
    } catch (error) {
        console.error(error);
    }
}