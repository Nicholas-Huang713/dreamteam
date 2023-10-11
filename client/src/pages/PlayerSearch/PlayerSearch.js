import { useState, useContext } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchPlayerData } from '../../api/nbaDataService';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import { UserContext } from '../../providers/UserProvider';

const PlayerSearch = () => {
    const {
        setPlayerModalOpen,
        setPlayerModalData
    } = useContext(UserContext);
    const [currentPlayerList, setCurrentPlayerList] = useState([]);
    const [noPlayerText, setNoPlayerText] = useState('');

    const handleSearch = async (value) => {
        if (value === '') return;
        const response = await fetchPlayerData(value);
        if (response.data.body.length === 0) {
            setNoPlayerText('No Results');
            setCurrentPlayerList([]);
        } else {
            setNoPlayerText('');
            setCurrentPlayerList(response.data.body);
        }
    };

    const handlePlayerModalOpen = (playerData) => {
        setPlayerModalData(playerData);
        setPlayerModalOpen(prev => !prev);
    }

    return (
        <>
            <h1 className="text-2xl mb-2">Search Player Database</h1>
            <SearchBar onSearch={handleSearch} />
            Players are from current NBA season
            <div className="flex flex-wrap justify-left mt-1">
                {currentPlayerList.length > 0 ?
                    currentPlayerList.map((player) => (
                        <PlayerCard player={player} setOpenModal={handlePlayerModalOpen} />
                    ))
                    : <>{noPlayerText}</>
                }
            </div>

        </>
    );
}

export default PlayerSearch;
