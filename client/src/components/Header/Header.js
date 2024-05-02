import { useMemo, useEffect, useState } from 'react';
import { nbaTeamData } from '../../api/nbaTeamData';
import { useLocation } from 'react-router-dom';
import { fetchTeamSchedule, fetchAllTeams } from '../../api/nbaDataService';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import logoImg from '../../images/basketballicon.png';

const currentDate = moment();

const Header = ({ teamAffil }) => {
    const location = useLocation();
    const [teamSchedule, setTeamSchedule] = useState([]);
    const [teamData, setTeamData] = useState(null);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    const headerTitle = useMemo(() => {
        let title;
        if (location.pathname === '/dashboard/home') title = 'Home';
        if (location.pathname === '/dashboard/myteam') title = "MyTeam";
        if (location.pathname === '/dashboard/players') title = "Players";
        return title;
    }, [location]);


    const teamImgUrl = useMemo(() => {
        if (teamAffil.team && teamAffil.team !== "") {
            const currentAffilFromDb = teamAffil.team;
            const currentTeamData = nbaTeamData.find((data) => data.name === currentAffilFromDb);
            return currentTeamData.logoLink;
        }
    }, [teamAffil.team])

    const renderTeamLogo = (teamAbbr) => {
        const filteredTeamData = nbaTeamData.filter((data) => data.abbr === teamAbbr);
        if (filteredTeamData.length > 0) return filteredTeamData[0].logoLink;
        return logoImg;
    };

    useEffect(() => {
        const currentTeamAbbrFromDb = teamAffil.abbr;
        const getTeamScheduleFromApi = async () => {
            try {
                const response = await fetchTeamSchedule(currentTeamAbbrFromDb);
                console.log("team schedule resp", response.body)
                const teamScheduleFromApi = response.body.schedule
                    // .filter((game) => moment(game.gameDate).isAfter(currentDate))
                    .slice(0, 5)
                setTeamSchedule(teamScheduleFromApi);
            } catch (e) {
                console.log('error', e)
            }
        }

        const getTeamDataFromApi = async () => {
            try {
                const response = await fetchAllTeams();
                const filteredTeamData = response?.body?.filter((data) => data.teamAbv === currentTeamAbbrFromDb);
                setTeamData(filteredTeamData);
            } catch (e) {
                console.log('error', e)
            }
        }
        if (teamAffil.team && teamAffil.team !== "") {
            getTeamScheduleFromApi();
            getTeamDataFromApi();
        }
    }, [teamAffil.team])

    const formatDateForDisplay = (date) => moment(date).format('ddd, MMM D');

    return (
        <>
            <header
                className={`shadow mx-auto  w-screen`}
                style={{ backgroundColor: `#${teamAffil.color && teamAffil.color !== '' ? teamAffil.color : ''}` }}
            >
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className={`${isSmallScreen ? 'flex' : ''} mr-2 w-40`}>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{headerTitle} </h1>
                        <div className={`flex items-start justify-start w-full ${isSmallScreen ? '' : 'mt-2'}`}>
                            {teamAffil.team === '' || !teamAffil.team ?
                                <></>
                                : <img src={teamImgUrl} alt="Team Logo" className="w-20 h-auto ml-2" />
                            }
                        </div>

                    </div>
                    <div>
                        {!isSmallScreen ?
                            (
                                <>
                                    {teamData ?
                                        <div className="flex w-full flex-wrap text-white font-bold pb-2">
                                            <div className="pr-3 text-lg">
                                                {teamData[0].teamCity} {teamData[0].teamName}
                                            </div>
                                            <div className="pr-5">
                                                {teamData[0].wins} - {teamData[0].loss}
                                            </div>
                                            <div className="pr-3">
                                                {teamData[0].conference}
                                            </div>
                                        </div>
                                        : null
                                    }

                                    <div className='text-white font-bold'>
                                        Upcoming Games
                                    </div>
                                    <div className='flex w-full flex-wrap'>
                                        {teamSchedule && teamSchedule.length > 0 ?
                                            (teamSchedule.map((game) => {
                                                return (
                                                    <div key={game.gameID} className='flex bg-white rounded-md p-3 m-2 text-sm'>
                                                        <div className='border-r border-gray-500 pr-5 mr-2'>
                                                            <div className='flex flex-row'>
                                                                <img src={renderTeamLogo(game.home)} alt="Team Logo" className="w-5 h-5 mr-1" />
                                                                {game.home}
                                                            </div>
                                                            <div className='flex flex-row'>
                                                                <img src={renderTeamLogo(game.away)} alt="Team Logo" className="w-5 h-5 mr-1" />
                                                                {game.away}
                                                            </div>
                                                        </div>
                                                        <div className='text-xs'>
                                                            <div>
                                                                {formatDateForDisplay(game.gameDate)}
                                                            </div>
                                                            <div className='flex items-center justify-center w-full'>
                                                                {game.gameTime}m
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            ))
                                            : null
                                        }
                                    </div>
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
