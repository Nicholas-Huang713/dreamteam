import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { UserContext } from '../../providers/UserProvider';
import GameHistoryTable from '../../components/GameHistoryTable/GameHistoryTable';

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
