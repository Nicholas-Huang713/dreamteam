import { useMemo, useEffect, useState } from 'react';
import { nbaTeamData } from '../../api/nbaTeamData';
import { useLocation } from 'react-router-dom';
import { fetchTeamSchedule } from '../../api/nbaDataService';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import logoImg from '../../images/basketballicon.png';

const currentDate = moment();

const Header = ({ teamAffil }) => {
    const location = useLocation();
    const [teamSchedule, setTeamSchedule] = useState([]);
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
        const getTeamScheduleFromApi = async () => {
            const currentTeamAbbrFromDb = teamAffil.abbr;
            const response = await fetchTeamSchedule(currentTeamAbbrFromDb);
            const teamScheduleFromApi = response.body.schedule
                .filter((game) => moment(game.gameDate).isAfter(currentDate))
                .slice(0, 5)
            setTeamSchedule(teamScheduleFromApi);
        }
        if (teamAffil.team && teamAffil.team !== "") getTeamScheduleFromApi();

    }, [teamAffil.team])

    const formatDateForDisplay = (date) => moment(date).format('ddd, MMM D');

    return (
        <>
            <header
                className={`shadow mx-auto max-w-7xl`}
                style={{ backgroundColor: `#${teamAffil.color && teamAffil.color !== '' ? teamAffil.color : ''}` }}
            >
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className={`${isSmallScreen ? 'flex' : ''} mr-2 w-40`}>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{headerTitle} </h1>
                        <div className={`flex items-start justify-start w-full ${isSmallScreen ? '' : 'mt-2'}`}>
                            {teamAffil.team === '' || !teamAffil.team ?
                                <></>
                                : <img src={teamImgUrl} alt="Team Logo" className="w-auto max-h-[45px] ml-2" />
                            }
                        </div>

                    </div>
                    <div>
                        {!isSmallScreen ?
                            (
                                <>
                                    <div className='text-white font-bold'>
                                        {teamAffil.abbr ? teamAffil.team : null} Upcoming Games
                                    </div>
                                    <div className='flex w-full flex-wrap'>
                                        {teamSchedule && teamSchedule.length > 0 ?
                                            (teamSchedule.map((game) => {
                                                return (
                                                    <div className='flex bg-white rounded-md p-3 m-2 text-sm'>
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
