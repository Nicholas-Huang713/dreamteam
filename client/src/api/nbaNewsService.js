import axios from 'axios';
const allowedDomains = 'espn.com,bleacherreport.com,foxsports.com,nbcsports.com';
const teamNewsUrl = teamName => `https://newsapi.org/v2/everything?q=${teamName}&pageSize=4&page=1&domains=${allowedDomains}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
const popularTeamNewsUrl = teamName => `https://newsapi.org/v2/everything?q=${teamName}&pageSize=4&page=1&sortBy=popular&domains=${allowedDomains}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`


export const getTeamNews = async (team) => {
    try {
        const teamNews = await axios.get(popularTeamNewsUrl(team));
        // const teamNews = await axios.get(teamNewsUrl(team));
        console.log('teamNews', teamNews)
        return teamNews.data.articles;
    } catch (e) {
        console.log('error', 'e')
    }

}