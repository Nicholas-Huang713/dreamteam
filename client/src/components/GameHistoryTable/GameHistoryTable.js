import { useState, useEffect } from 'react';
import coinIcon from '../../images/coin.svg';


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

const gameDetailsHeadings = [
    {
        headingTitle: 'Player'
    },
    {
        headingTitle: 'Total Points'
    },
    {
        headingTitle: 'Points'
    },
    {
        headingTitle: 'Rebounds'
    },
    {
        headingTitle: 'Assists'
    },
]

const GameHistoryTable = ({ gameHistory, isTopGames }) => {
    const [isGameClicked, setIsGameClicked] = useState(false);
    const [gameDetails, setGameDetails] = useState(false);

    const [isLoadMoreGamesClicked, setIsLoadMoreGamesClicked] = useState(false);

    const [tableData, setTableData] = useState([]);

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

    const formatDate = (timeStamp) => {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate;
    }

    const handleGameClick = (game) => {
        setGameDetails(game);
        setIsGameClicked(prev => !prev);
    }

    const renderGameHistoryList = () => {
        return <div className='overflow-x-auto'>
            <div className='text-xl mt-10 mb-5'>
                {isTopGames ? 'Leader Board' : 'Game History'}
            </div>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                <thead>
                    <tr>
                        {renderTableHeadings(gameTableHeadings)}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 ? tableData.map((data) => (
                        <tr className=' text-sm hover:bg-orange-100'>
                            <td className='p-1'>
                                <button
                                    className='flex items-center justify-left text-orange-600'
                                    onClick={() => handleGameClick(data)}
                                >
                                    {formatDate(data.date)}
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
            {gameHistory.length <= 5 ?
                null
                :
                <div className='flex justify-center mt-3 w-full'>
                    <button
                        onClick={() => setIsLoadMoreGamesClicked(prev => !prev)}
                        className="text-orange-500 font-bold"
                    >
                        {tableData.length > 5 ? 'See less' : 'Load more'}
                    </button>
                </div>
            }
        </div>
    }

    const renderGameDetails = () => {
        const { results, totalPts, avgPts, winnings, owner, teamName } = gameDetails;
        return <div className='overflow-x-auto'>
            <div className='mt-5 mb-1'>
                <button
                    onClick={() => setIsGameClicked(prev => !prev)}
                    className='flex flex-row bg-orange-300 rounded p-1 text-white items-center justify-center'
                >
                    {isTopGames ? 'Leaderboard' : 'All Games'}
                </button >
            </div >
            <div className='font-bold text-xl mt-2'>
                Team: {teamName}
            </div>
            <div className='font-bold text-l'>
                Manager: {owner}
            </div>
            <div className='flex flex-row flex-wrap mt-2'>
                <div className='mr-3'>
                    <span className='font-bold'>W/L: </span>
                    {winnings.winner ?
                        <span className='font-bold text-green-500'>W</span>
                        : <span className='font-bold text-red-500'>L</span>
                    }
                </div>
                <div className='mr-3'>
                    <span className='font-bold'>Total Points:</span> {totalPts}
                </div>
                <div className='mr-3'>
                    <span className='font-bold'>Average Points:</span> {avgPts}
                </div>
                <div className='flex flex-row'>
                    <span className='font-bold'>Winnings:</span>  <img src={coinIcon} className='w-5 mr-1' />{winnings.amountWon}
                </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                <thead>
                    <tr>
                        {renderTableHeadings(gameDetailsHeadings)}
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? results.map((data) => (
                        <tr className=' text-sm hover:bg-orange-100'>
                            <td className='p-1 flex flex-row'>
                                <img src={data.imgUrl} className='w-10 h-auto' />
                                {data.player}
                            </td>
                            <td className='pl-6'>
                                {data.dreamTeamPts}
                            </td>
                            <td className='pl-6'>{data.pts}</td>
                            <td className='pl-6'>{data.reb}</td>
                            <td className='pl-6'>{data.ast}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    }

    useEffect(() => {
        updateTableData();
    }, [gameHistory])

    useEffect(() => {
        let displayData;
        if (tableData.length > 5) {
            displayData = gameHistory.slice(0, 5)
        } else {
            displayData = gameHistory;
        }
        setTableData(displayData);
    }, [isLoadMoreGamesClicked])

    const updateTableData = () => {
        let displayData;
        if (gameHistory && gameHistory.length > 5) {
            displayData = gameHistory.slice(0, 5);
        } else {
            displayData = gameHistory;
        }
        setTableData(displayData);
    };

    return (
        <>
            {isGameClicked ? renderGameDetails() : renderGameHistoryList()}
        </>
    );
}

export default GameHistoryTable;
