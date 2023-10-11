import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchPlayerPhotoData, fetchPlayerData } from '../../api/nbaDataService';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

const PlayerSearch = () => {
    const [currentPlayerList, setCurrentPlayerList] = useState([]);

    const handleSearch = async (value) => {
        const response = await fetchPlayerData(value);
        setCurrentPlayerList(response.data.body);
    };

    return (
        <>
            <h1>Search Player Information</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-wrap justify-between">
                {currentPlayerList.length > 0 ?
                    currentPlayerList.map((player) => (
                        <PlayerCard player={player} />
                    ))
                    : null
                }
            </div>

        </>
    );
}

export default PlayerSearch;
