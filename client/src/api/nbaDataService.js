import axios from 'axios';

export const fetchNbaTeamData = async () => {
    const options = {
        method: 'GET',
        url: 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams',
        // url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/1',
    };

    try {
        const response = await axios.request(options);
        const teamsList = response.data.sports[0].leagues[0].teams;

        const logoList = teamsList.map((data) => {
            const team = data.team;
            return {
                id: team.id,
                logoLink: team.logos[0].href,
                displayName: team.displayName,
                name: team.name,
                abbr: team.abbreviation,
                color: team.color
            }
        })

    } catch (error) {
        console.error("Error: ", error);
    }
};

// export const fetch