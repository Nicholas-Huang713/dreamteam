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

const gameTableHeadings = [
    {
        headingTitle: 'Date'
    },
    {
        headingTitle: 'Result'
    },
    {
        headingTitle: 'Total Points'
    },
    {
        headingTitle: 'Average Points'
    },
]

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

    useEffect(() => {
        setTableData(tableBodyData);
    }, [tableBodyData])

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

    const renderTeamTableBody = () => {
        if (tableData.length > 0 && tableData[0].teamName && !isTeamSelected) {
            return tableData.map((data) => (
                <tr className=' hover:bg-orange-100'>
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
            ))
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

    const renderTableTitle = () => {
        if (isMyTeam) return <h1 className='text-bold text-xl'>Managed Teams</h1>
        return null;
    }

    const handleOpenPlayConfirmation = () => {
        setPlayTeamModalOpen(prev => !prev);
        setSelectedTeamToPlay(selectedTeamData);
    }

    const formatDate = (timeStamp) => {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate;
    }

    const renderGameHistory = () => {
        const gameData = gameHistory.filter((game) => selectedTeamData.teamName === game.teamName);

        return <>
            <div className='text-xl mt-10 mb-5'>
                Game History
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {renderTableHeadings(gameTableHeadings)}
                    </tr>
                </thead>
                <tbody>
                    {gameData.length > 0 ? gameData.map((data) => (
                        <tr className=' text-sm hover:bg-orange-100'>
                            <td className='p-1'>
                                <button
                                    className='flex items-center justify-left text-orange-600'
                                // onClick={() => handlePlayerClick(data)}
                                >
                                    {formatDate(parseInt(data.date))}
                                </button>
                            </td>
                            <td className='pl-6'>{data.winnings.winner ?
                                <span className='text-green-500 font-bold '>W</span>
                                : <span className='text-red-500 font-bold '>L</span>
                            }</td>
                            <td className='pl-6'>{data.totalPts}</td>
                            <td className='pl-6'>{data.avgPts}</td>


                        </tr>
                    )) : null}
                </tbody>
            </table>
        </>
    }

    return (
        <div>
            <p className='text-red'>{apiError}</p>
            {isTeamSelected ?
                <>
                    <h1 className='text-bold text-xl'>{selectedTeamData.teamName ? selectedTeamData.teamName : null}</h1>
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

            {isTeamSelected ? renderGameHistory() : null}
            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
};

export default Table;
