import { useState, useEffect, useContext } from 'react';
import { calculatePlayerPrice } from '../../utils/generalUtils';
import coinIcon from '../../images/coin.svg';
import minusIcon from '../../images/minusicon.svg';
import AddPlayerButton from '../AddPlayerButton/AddPlayerButton';
import { useMediaQuery } from 'react-responsive';
import arrowIcon from '../../images/backarrowicon.svg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getJwt } from '../../utils/jwt';
import axios from 'axios';
import { removePlayer } from '../../api/userService';
import { useSelector, useDispatch } from 'react-redux';
import { updateManagedTeams } from '../../store/actions/userActions';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import GameHistoryTable from './../GameHistoryTable/GameHistoryTable';

const teamTableHeadings = [
    {
        headingTitle: ''
    },
    {
        headingTitle: 'Team'
    },
    {
        headingTitle: 'Owner'
    },
];



const activeLink = {
    fontWeight: 'bold',
    textDecoration: 'underline'
}

const Table = ({ tableBodyData, handlePlayerClick, isMyTeam }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState(tableBodyData);
    const [apiError, setApiError] = useState('');
    const [isLoadMoreTeamsClicked, setIsLoadMoreTeamsClicked] = useState(false);
    const [showLoadMoreTeams, setShowLoadMoreTeams] = useState(false);

    const { managedTeams, gameHistory } = useSelector(state => state.user);
    const {
        selectedTeamData,
        setSelectedTeamData,
        setDropPlayerModalOpen,
        dropPlayerModalOpen,
        selectedPlayerToDrop,
        setSelectedPlayerToDrop,
        playTeamModalOpen,
        setPlayTeamModalOpen,
        setSelectedTeamToPlay,
        setCreateTeamModalOpen,
    } = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            headingTitle: 'Cost'
        },
        {
            headingTitle: isMyTeam ? 'Drop' : 'Draft'
        },
    ]

    const renderTableHeadings = (tableHeadings) => {
        if (tableHeadings) {
            return tableHeadings.map((data) => (
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {data.headingTitle}
                </th>
            ))
        }
        return [];
    };

    const handleTeamClick = (teamData) => {
        setIsTeamSelected(true);
        setSelectedTeamData(teamData);
    };

    const handleBackToTeamTable = () => {
        setIsTeamSelected(false);
        setSelectedTeamData({});
    };

    const handleOpenDropPlayerModal = (player) => {
        setDropPlayerModalOpen(prev => !prev);
        setSelectedPlayerToDrop(player);
    };

    const handleLoadMoreTeams = () => {
        setIsLoadMoreTeamsClicked(prev => !prev);
        console.log(isLoadMoreTeamsClicked)
    }

    const renderTeamTableBody = () => {
        if (tableData.length > 0 && tableData[0].teamName && !isTeamSelected) {
            return <>
                {tableData.map((data) => (
                    <tr className='hover:bg-orange-100'>
                        <td className='w-3'>
                            <div className='p-2 w-3' style={{ backgroundColor: data.color }}></div>
                        </td>
                        <td>
                            <button
                                className='flex items-center justify-left text-orange-600'
                                onClick={() => handleTeamClick(data)}
                            >
                                {data.teamName}
                            </button>
                        </td>
                        <td>
                            {data.owner}
                        </td>
                    </tr>
                ))}
                {tableBodyData.length < 5 ?
                    null
                    :
                    <div className='flex justify-center mt-3 w-full'>
                        <button
                            onClick={handleLoadMoreTeams}
                            style={{ width: '100px' }}
                            className="text-orange-500 font-bold"
                        >
                            {isLoadMoreTeamsClicked ? 'See less' : 'Load more'}
                        </button>
                    </div>
                }
            </>
        }
        return []
    };

    const renderDropPlayerButton = (playerData) => {
        if (playerData.nbaComName && playerData.stats.pts && isMyTeam) {
            return <button
                className='w-5 hover:bg-orange-500'
                onClick={() => handleOpenDropPlayerModal(playerData)}
            >
                <img src={minusIcon} className='' />
            </button>
        }
        return 'Inactive';
    }

    const renderPlayerTableBody = (tableContent) => {
        if (tableContent) {
            return tableContent.map((data) => (
                <tr className='text-center text-sm hover:bg-orange-100'>
                    <td className='p-1'>
                        <button
                            className='flex items-center justify-left text-orange-600'
                            onClick={() => handlePlayerClick(data)}
                        >
                            <img src={data.nbaComHeadshot} className='w-8 h-auto' />
                            {data.nbaComName}
                        </button>

                    </td>
                    <td>{data.team}</td>
                    <td>{data.jerseyNum}</td>
                    <td>{data.pos}</td>
                    <td>{data.height}</td>
                    <td className='flex flex-nowrap items-center justify-left'>
                        {data.stats.pts ?
                            <img src={coinIcon} className='w-5' /> : null}
                        {data.stats.pts ? calculatePlayerPrice([parseInt(data.stats.pts), parseInt(data.stats.reb), parseInt(data.stats.ast)]) : null}
                    </td>
                    <td>
                        {data.nbaComName && data.stats.pts && !isMyTeam ?
                            <AddPlayerButton player={data} size={'5'} playerCost={calculatePlayerPrice([parseInt(data.stats.pts), parseInt(data.stats.reb), parseInt(data.stats.ast)])} />
                            : renderDropPlayerButton(data)
                        }
                    </td>
                </tr>
            ))
        } return []
    };

    const handleOpenCreateTeamModal = () => {
        setCreateTeamModalOpen(prev => !prev);

    };

    const renderCreateTeamButton = () => {
        return <button
            onClick={handleOpenCreateTeamModal}
            className=" px-4 py-2 font-bold text-orange-500 hover:bg-orange-100"
        >
            +Create new team
        </button>
    };

    const renderTableTitle = () => {
        if (isMyTeam) {
            return <div className='flex flex-row flex-wrap items-center'>
                <h1 className='text-bold text-xl'>Managed Teams</h1>
                {renderCreateTeamButton()}
            </div>
        }
        return null;
    }

    const handleOpenPlayConfirmation = () => {
        setPlayTeamModalOpen(prev => !prev);
        setSelectedTeamToPlay(selectedTeamData);
    }

    const gameData = gameHistory.filter((game) => selectedTeamData.teamName === game.teamName).reverse();

    useEffect(() => {
        if (!isMyTeam) return;
        let displayData;
        if (tableBodyData && tableBodyData.length > 5) {
            displayData = tableBodyData.slice(0, 5);
        } else {
            displayData = tableBodyData;
        }
        setTableData(displayData);
    }, [tableBodyData])

    useEffect(() => {
        if (!isMyTeam) return;
        let displayData;
        if (tableData.length > 5) {
            displayData = tableData.slice(0, 5)
        } else {
            displayData = tableBodyData;
        }
        setTableData(displayData);
    }, [isLoadMoreTeamsClicked])

    useEffect(() => {
        return () => {
            setIsLoadMoreTeamsClicked(false);
        }
    }, [])

    return (
        <div>
            <p className='text-red'>{apiError}</p>
            {isTeamSelected ?
                <>
                    <div className='flex flex-row mb-2'>
                        <div className='p-2 w-7 mr-1 ' style={{ backgroundColor: selectedTeamData.color }}></div>
                        <h1 className='text-bold text-xl'>{selectedTeamData.teamName ? selectedTeamData.teamName : null}</h1>
                    </div>
                    <button
                        className='border border-3 border-orange-500 p-2 hover:bg-orange-500 shadow-xl mb-2'
                        onClick={handleBackToTeamTable}
                    >
                        <img src={arrowIcon} className='w-5' />
                    </button>
                </>
                : renderTableTitle()
            }
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {isTeamSelected || !isMyTeam ? renderTableHeadings(playerTableHeadings) : renderTableHeadings(teamTableHeadings)}
                    </tr>
                </thead>
                <tbody>
                    {!isTeamSelected && tableData.length > 0 && tableData[0].nbaComName ?
                        renderPlayerTableBody(tableData)
                        : renderTeamTableBody()
                    }
                    {isTeamSelected ?
                        renderPlayerTableBody(selectedTeamData.teamName ? selectedTeamData.roster : [])
                        : null
                    }
                </tbody>
            </table>
            {isTeamSelected && selectedTeamData.roster.length < 5 ?
                <div className='flex items-center justify-center w-full mt-5'>
                    <button
                        onClick={() => navigate('/dashboard/players')}
                        className="w-auto flex bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 m-auto`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Players
                    </button>
                </div>
                : null
            }
            {isTeamSelected && selectedTeamData.roster.length === 5 ?
                <div className='flex items-center justify-left w-full mt-5'>
                    <button
                        onClick={handleOpenPlayConfirmation}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        Play
                    </button>
                </div>
                : null
            }

            {isTeamSelected ? <GameHistoryTable gameHistory={gameData} /> : null}
            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
};

export default Table;
