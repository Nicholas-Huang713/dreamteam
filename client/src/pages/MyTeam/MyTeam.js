import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { UserContext } from '../../providers/UserProvider';

const MyTeam = () => {
    const [teamData, setTeamData] = useState([])

    const userState = useSelector(state => state.user);
    const {
        setPlayerModalData,
        setPlayerModalOpen
    } = useContext(UserContext);

    const handlePlayerClick = (playerData) => {
        setPlayerModalData(playerData);
        setPlayerModalOpen(prev => !prev);
    }

    useEffect(() => {
        setTeamData(userState.managedTeams);
    }, [userState.managedTeams])

    return (
        <div>

            <Table
                tableBodyData={teamData}
                handlePlayerClick={handlePlayerClick}
                isMyTeam={true}
            />

        </div>
    );
}

export default MyTeam;
