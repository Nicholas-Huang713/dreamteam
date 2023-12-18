import axios from 'axios';
const allowedDomains = 'espn.com,bleacherreport.com,foxsports.com,nbcsports.com';
const nbaQuery = 'nba basketball'
const teamNewsUrl = teamName => `https://newsapi.org/v2/everything?q=${teamName}&pageSize=4&page=1&domains=${allowedDomains}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
const popularTeamNewsUrl = (teamName, pageSize) => `https://newsapi.org/v2/everything?q=${teamName}&pageSize=${pageSize}&page=1&sortBy=popular&domains=${allowedDomains}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
const nbaNewsUrl = (pageSize) => `https://newsapi.org/v2/everything?q=${nbaQuery}&pageSize=${pageSize}&page=1&sortBy=popular&domains=${allowedDomains}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`


const rapidApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TANK01_KEY,
    'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
}

export const getTeamNews = async (team, pageSize) => {
    try {
        const teamNews = await axios.get(popularTeamNewsUrl(team, pageSize));
        return teamNews.data.articles;
    } catch (e) {
        console.log('error', 'e')
    }

}

export const getNbaNews = async (pageSize) => {
    const options = {
        method: 'GET',
        url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBANews',
        params: {
            recentNews: 'true',
            maxItems: pageSize
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
