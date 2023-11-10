import { useState, useEffect } from 'react';
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
]



const Table = ({ tableBodyData, handlePlayerClick, isMyTeam }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState(tableBodyData);
    const [apiError, setApiError] = useState('');
    const [selectedTeamData, setSelectedTeamData] = useState({});
    const { managedTeams } = useSelector(state => state.user);
    const dispatch = useDispatch();

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

    const handleOpenDropPlayerModal = () => {

    };

    const handleDropPlayer = async (player) => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const res = await axios.put(removePlayer, player, { headers: { 'Authorization': `Bearer ${jwt}` } });
            const currentTeamSelected = res.data.filter((team) => team.teamName === selectedTeamData.teamName);
            dispatch(updateManagedTeams(res.data));
            setIsLoading(false);
            setSelectedTeamData(currentTeamSelected[0]);
            setApiError('');
        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data);
            // setIsSuccess(false); 
            setIsLoading(false);
        }
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
                onClick={() => handleDropPlayer(playerData)}
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

    return (
        <div className="">
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
                        {isTeamSelected ? renderTableHeadings(playerTableHeadings) : renderTableHeadings(teamTableHeadings)}
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
            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
};

export default Table;
