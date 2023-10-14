import React from 'react';

const Table = ({ tableHeadings, tableData, handlePlayerClick }) => {
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
                    <td>{data.weight}</td>
                    <td>{data.college}</td>
                </tr>
            ))
        }
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
                    {renderTableBody()}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
