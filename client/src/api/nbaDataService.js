import axios from 'axios';

export const fetchPlayerData = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo',
        params: {
            playerName: query,
            statsToGet: 'averages'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TANK01_KEY,
            'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log('player data', response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// export const fetchNbaTeamData = async () => {
//     const options = {
//         method: 'GET',
//         url: 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams',
//     };

//     try {
//         const response = await axios.request(options);
//         console.log('nbateamdata response', response)
//         const teamsList = response.data.sports[0].leagues[0].teams;

//         const logoList = teamsList.map((data) => {
//             const team = data.team;
//             return {
//                 id: team.id,
//                 logoLink: team.logos[0].href,
//                 displayName: team.displayName,
//                 name: team.name,
//                 abbr: team.abbreviation,
//                 color: team.color
//             }
//         })

//     } catch (error) {
//         console.error("Error: ", error);
//     }
// };