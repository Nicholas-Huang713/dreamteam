import { useMemo, useEffect, useState } from 'react';
import { nbaTeamData } from '../../api/nbaTeamData';
import { useLocation } from 'react-router-dom';

const Header = ({ teamAffil }) => {
    const location = useLocation();

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


    return (
        <>
            <header
                className={`shadow mx-auto max-w-7xl`}
                style={{ backgroundColor: `#${teamAffil.color && teamAffil.color !== '' ? teamAffil.color : ''}` }}
            >
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{headerTitle} </h1>
                    {teamAffil.team === '' || !teamAffil.team ?
                        <></>
                        : <img src={teamImgUrl} alt="Team Logo" className="w-auto max-h-[40px] ml-2" />
                    }
                    {/* {teamStandings.Season ?
                        <div>
                            {teamStandings.Season}
                        </div>
                        : null
                    } */}
                </div>
            </header>
        </>
    );
}

export default Header;
