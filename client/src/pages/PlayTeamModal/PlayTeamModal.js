import { useContext, useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { getJwt } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';
import { updateGamesPlayed, updateUserCurrency } from '../../store/actions/userActions';
import { updateGamesList } from '../../store/actions/gameActions';
import { playGame } from '../../api/userService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import coinIcon from '../../images/coin.svg';

const PlayTeamModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currency } = useSelector(state => state.user);
    const {
        selectedTeamToPlay,
        setSelectedTeamToPlay,
        playTeamModalOpen,
        setPlayTeamModalOpen
    } = useContext(UserContext);
    const {
        teamName,
        ownerId,
        owner,
        color
    } = selectedTeamToPlay;

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState('');

    const setIsOpen = () => {
        setPlayTeamModalOpen(prev => !prev);
        setApiError('');
        setIsSuccess(false);
        setSelectedTeamToPlay({});
    }

    const generateRandomStat = (avg, isAssists = false) => {
        const stat = Math.floor(parseInt(avg));
        const deviation = stat / 2;
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        let randomNumber = Math.floor(z0 * deviation + stat);
        if (randomNumber < 0) randomNumber = Math.abs(randomNumber);
        return randomNumber;
    }

    const calcActualAstPts = (ast) => {
        return ast * 1.25;
    }

    const calculateGameResults = (player) => {
        const { pts, reb, ast } = player.stats;
        const randomReb = generateRandomStat(reb);
        const randomAst = generateRandomStat(ast, true);
        const randomPts = generateRandomStat(pts);
        const statsArr = [randomReb, calcActualAstPts(randomAst), randomPts];
        const dreamTeamPts = statsArr.reduce((accum, curr) => accum + curr, 0);
        const results = {
            player: player.nbaComName,
            pts: randomPts,
            reb: randomReb,
            ast: randomAst,
            dreamTeamPts,
            imgUrl: player.espnHeadshot
        };
        return results;
    }

    const handleGetGameResults = () => {

        const gameResultsList = selectedTeamToPlay.roster.map((player) => (
            calculateGameResults(player)
        ))
        const totalDreamTeamPts = gameResultsList.reduce((accum, curr) => accum + curr.dreamTeamPts, 0)
        return {
            totalDreamTeamPts,
            gameResultsList
        };
    }

    const getPlayerPtsAvg = (player) => {
        const { pts, reb, ast } = player.stats;
        return parseInt(pts) + parseInt(reb) + calcActualAstPts(parseInt(ast))
    }

    const handleGetAvgDreamTeamPts = () => {
        const totalPtsAvg = selectedTeamToPlay.roster.reduce((accum, current) => accum + getPlayerPtsAvg(current), 0);
        return totalPtsAvg;
    };

    const handlePlayGame = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        setApiError('');
        const resultsData = handleGetGameResults();
        const finalGameResults = {
            results: resultsData.gameResultsList,
            avgPts: handleGetAvgDreamTeamPts(),
            totalDreamTeamPts: resultsData.totalDreamTeamPts,
            teamName,
            owner,
            ownerId,
            color
        }
        console.log('finalGameResults', finalGameResults)
        try {
            const response = await axios.post(playGame, finalGameResults, { headers: { 'Authorization': `Bearer ${jwt}` } });
            const { updatedUserData, game, allGames, winnings } = response.data;
            console.log('winnings', winnings)
            dispatch(updateUserCurrency(updatedUserData.currency));
            dispatch(updateGamesPlayed(game));
            dispatch(updateGamesList(allGames));
            setIsSuccess(true);
            setIsLoading(false);
            setPlayTeamModalOpen(false);
            navigate('/dashboard/myteam');
        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data);
            setIsSuccess(false);
            setIsLoading(false);
        }
    }

    const currencyIcon = <img src={coinIcon} className='w-5' />;

    const hasEnoughCurrency = currency >= 5 ? true : false;

    const renderConfirmationText = () => {
        return hasEnoughCurrency ?
            <>
                <div className="text-gray-700 mb-6">
                    Are you sure you want to play <br /> Team: <span className='font-bold text-orange-500'>{teamName}</span> ?
                </div>
                <div className='flex flex-row'>
                    <span className='mr-2'>Currency: </span>{currencyIcon} {currency ? currency : null}
                </div>
                <div className='flex flex-row'>
                    <span className='mr-2'>Cost:</span>  {currencyIcon}5
                </div>
            </>
            : <>
                <p className="text-red-500 mb-6">
                    Not enough funds to play Team: <span className='font-bold text-orange-500'>{teamName}</span>
                </p>
                <p>
                    Currency: {currencyIcon} {currency ? currency : null}
                </p>
                <div className='flex flex-row'>
                    Cost: {currencyIcon}5
                </div>
            </>
    }

    useEffect(() => {
        return () => {
            setIsSuccess(false);
            setApiError('')
        }
    }, [])

    return (
        <>
            <Modal
                isOpen={playTeamModalOpen}
                setIsOpen={setIsOpen}
            >
                <div className="flex items-center justify-center z-50">
                    <div className="w-80 p-6 ">
                        <h2 className="text-2xl font-semibold mb-4">Play Game Confirmation</h2>
                        <p className='text-red-500'>{apiError}</p>
                        {renderConfirmationText()}
                        <div className="flex justify-end">
                            <button
                                onClick={setIsOpen}
                                className="px-4 py-2 mr-2 text-gray-600 border border-gray-400 rounded hover:bg-gray-100"
                            >
                                {isSuccess === true ? 'Close' : 'Cancel'}
                            </button>
                            {hasEnoughCurrency && !isSuccess ?
                                <button
                                    onClick={handlePlayGame}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-500"
                                >
                                    Play
                                </button>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </Modal>
            {isLoading ? <LoadingSpinner /> : null}
        </>
    );
}

export default PlayTeamModal;
