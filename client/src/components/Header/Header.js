import { useMemo } from 'react';
import { nbaTeamData } from '../../api/nbaTeamData';
import { useLocation } from 'react-router-dom';

const Header = ({ teamAffil }) => {
    const location = useLocation();

    const headerTitle = useMemo(() => {
        let title;
        if (location.pathname === '/dashboard/home') title = 'Home';
        if (location.pathname === '/dashboard/myteam') title = "MyTeam";
        console.log("header func ran")
        return title;
    }, [useLocation()]);


    const teamImgUrl = useMemo(() => {
        if (teamAffil) {
            const currentAffilFromDb = teamAffil.team;
            const currentTeamData = nbaTeamData.find((data) => data.name === currentAffilFromDb);
            const imgLink = currentTeamData.logoLink;
            return imgLink;
        }
    }, [teamAffil])

    return (
        <>
            <header
                className={`shadow mx-auto max-w-7xl`}
                style={{ backgroundColor: `#${teamAffil && teamAffil.color}` }}
            >
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{headerTitle} </h1>
                    <img src={teamImgUrl} alt="Team Logo" className="w-auto max-h-[40px] ml-2" />
                </div>
            </header>
        </>
    );
}

export default Header;
