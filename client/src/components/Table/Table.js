import React from 'react';
import { calculatePlayerPrice } from '../../utils/generalUtils';
import coinIcon from '../../images/coin.svg';
import AddPlayerButton from '../AddPlayerButton/AddPlayerButton';
import { useMediaQuery } from 'react-responsive';

const Table = ({ tableHeadings, tableData, handlePlayerClick }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    const renderTableHeadings = () => {
        if (tableHeadings) {
            return tableHeadings.map((data) => (
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {data.headingTitle}
                </th>
            ))
        }
        return [];
    };

    const renderTableBody = () => {
        if (tableData) {
            return tableData.map((data) => (
                <tr className='text-center text-sm hover:bg-orange-100 '>
                    <td className='p-1'>
                        <button
                            className='flex items-center justify-left text-orange-600'
                        // onClick={() => handlePlayerClick(data)}
                        >
                            {/* <img src={data.nbaComHeadshot} className='w-8 h-auto' />
                            {data.nbaComName} */}
                        </button>
                    </td>
                    {/* <td>{data.team}</td> */}

                </tr>
            ))
        }
        return []
    };

    const renderPlayerTableBody = () => {
        if (tableData) {
            return tableData.map((data) => (
                <tr className='text-center text-sm hover:bg-orange-100 '>
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
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {renderTableHeadings()}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 && tableData[0].nbaComName ?
                        renderPlayerTableBody()
                        : renderTableBody()
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
