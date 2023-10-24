import { useState } from 'react';
import { calculatePlayerPrice } from '../../utils/generalUtils';
import coinIcon from '../../images/coin.svg';
import AddPlayerButton from '../AddPlayerButton/AddPlayerButton';
import { useMediaQuery } from 'react-responsive';
import arrowIcon from '../../images/backarrowicon.svg';


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
        headingTitle: 'Draft'
    },
]

const Table = ({ tableData, handlePlayerClick }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [selectedTeamData, setSelectedTeamData] = useState({});

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
                        <img src={coinIcon} className='w-5' />
                        {data.stats.pts ? calculatePlayerPrice([parseInt(data.stats.pts), parseInt(data.stats.reb), parseInt(data.stats.ast)]) : null}
                    </td>
                    <td>
                        {data.nbaComName && data.stats.pts ?
                            <AddPlayerButton player={data} size={'5'} playerCost={calculatePlayerPrice([parseInt(data.stats.pts), parseInt(data.stats.reb), parseInt(data.stats.ast)])} />
                            : 'Inactive'
                        }
                    </td>
                </tr>
            ))
        } return []
    };

    return (
        <div className="">
            {isTeamSelected ?
                <button>
                    <img src={arrowIcon} className='w-5' />
                </button>
                : null
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
        </div>
    );
};

export default Table;
