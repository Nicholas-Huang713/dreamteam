import { useState, useContext } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchPlayerData, fetchTeamRoster } from '../../api/nbaDataService';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import { UserContext } from '../../providers/UserProvider';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import { nbaTeamData } from '../../api/nbaTeamData';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Table from '../../components/Table/Table';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const filteredTeamData = nbaTeamData.map((data) => {
    return {
        value: data.displayName
    }
})

const playerTableHeadings = [
    {
        headingTitle: 'Player'
    },
    {
        headingTitle: 'Team'
    },
    {
        headingTitle: 'Number'
    },
    {
        headingTitle: 'Position'
    },
    {
        headingTitle: 'Height'
    },
    {
        headingTitle: 'Weight'
    },
    {
        headingTitle: 'College'
    },
]

const PlayerSearch = () => {
    const { affiliation } = useSelector(state => state.user);
    const {
        setPlayerModalOpen,
        setPlayerModalData
    } = useContext(UserContext);
    const [currentPlayerList, setCurrentPlayerList] = useState([]);
    const [currentRoster, setCurrentRoster] = useState([]);
    const [noPlayerText, setNoPlayerText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRosterSearch, setIsRosterSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (value) => {
        setIsLoading(true);
        setCurrentPlayerList([]);
        setCurrentRoster([]);
        if (value === '') return;
        const response = await fetchPlayerData(value);
        if (response.data.body.length === 0) {
            setNoPlayerText('No Results');
            setCurrentPlayerList([]);
            setIsLoading(false);
        } else {
            setNoPlayerText('');
            setCurrentPlayerList(response.data.body);
            setIsRosterSearch(false);
            setIsLoading(false);
        }
    };

    const handlePlayerModalOpen = (playerData) => {
        setPlayerModalData(playerData);
        setPlayerModalOpen(prev => !prev);
    }

    const handleSelectOptionChange = async (teamName) => {
        setIsLoading(true);
        setCurrentRoster([]);
        setCurrentPlayerList([]);
        const teamAbbr = nbaTeamData.find(team => team.displayName === teamName).abbr;
        const teamRosterFromApi = await fetchTeamRoster(teamAbbr);
        const rosterList = teamRosterFromApi.body.roster;
        if (rosterList) {
            setCurrentRoster(rosterList);
            setIsRosterSearch(true);
            setIsLoading(false);
            errorMessage !== '' && setErrorMessage('');
            return;
        }

        setErrorMessage('Problem retreiving team roster');
        setIsLoading(false);
    };

    const renderNoPlayerText = () => {
        if (!isRosterSearch) return noPlayerText;
    };

    return (
        <>
            <h1 className="text-2xl mb-2">Search Player Database</h1>
            <p className='text-red'>{errorMessage}</p>
            <div className='flex flex-wrap justify-between'>
                <SearchBar onSearch={handleSearch} />&nbsp;&nbsp;
                <SelectComponent
                    currentOptions={filteredTeamData}
                    showLabel={false}
                    handleOptionChange={handleSelectOptionChange}
                    defaultVal={affiliation.displayName}
                />
            </div>
            Players are from current NBA season
            {isLoading ? <LoadingSpinner /> : null}
            <div className="flex flex-wrap justify-left mt-3">
                {!isRosterSearch && currentPlayerList.length > 0 ?
                    currentPlayerList.map((player) => (
                        <PlayerCard player={player} setOpenModal={handlePlayerModalOpen} />
                    ))
                    : renderNoPlayerText()
                }
            </div>
            <div className='mt-3'>
                {isRosterSearch && currentRoster.length > 0 ?
                    <Table tableHeadings={playerTableHeadings} handlePlayerClick={handlePlayerModalOpen} tableData={currentRoster} />
                    : null
                }
            </div>
        </>
    );
}

export default PlayerSearch;
