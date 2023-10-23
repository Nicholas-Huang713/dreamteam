import { useContext, useState, useEffect } from 'react';
import { calculatePlayerPrice } from '../../utils/generalUtils';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { getJwt } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';
import { updateManagedTeams } from '../../store/actions/userActions';
import { addPlayer } from '../../api/userService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';

const ConfirmationModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currency } = useSelector(state => state.user)
    const {
        confirmModalOpen,
        setConfirmModalOpen,
        selectedPlayerToSave,
        setSelectedPlayerToSave,
        setPlayerModalOpen
    } = useContext(UserContext);
    const {
        nbaComName,
        teamName,
        stats,
    } = selectedPlayerToSave;

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState('');

    const setIsOpen = () => {
        setConfirmModalOpen(prev => !prev);
        setApiError('');
        setIsSuccess(false);
        setSelectedPlayerToSave({});
    }

    const handleAddPlayer = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        setApiError('');
        try {
            const updatedTeamListWithNewPlayer = await axios.put(addPlayer, selectedPlayerToSave, { headers: { 'Authorization': `Bearer ${jwt}` } });

            dispatch(updateManagedTeams(updatedTeamListWithNewPlayer.data));
            setIsSuccess(true);
            setIsLoading(false);
            setPlayerModalOpen(false);
            navigate('/dashboard/myteam');
        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data);
            setIsSuccess(false);
            setIsLoading(false);
        }
    }

    const playerCost = stats && stats.pts ?
        calculatePlayerPrice([parseInt(stats.pts), parseInt(stats.reb), parseInt(stats.ast)])
        : null

    const hasEnoughCurrency = currency >= playerCost ? true : false;

    const renderConfirmationText = () => {
        return hasEnoughCurrency ?
            <>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to draft <span className='font-bold'>{nbaComName ? nbaComName : null}</span> to Team: <span className='font-bold text-orange-500'>{teamName}</span>?
                </p>
                <p>
                    Currency: {currency ? currency : null}
                </p>
                <p>
                    Cost: {playerCost}
                </p>
            </>
            : <>
                <p className="text-red-500 mb-6">
                    Not enough funds to draft {nbaComName ? nbaComName : null}
                </p>
                <p>
                    Currency: {currency ? currency : null}
                </p>
                <p>
                    Cost: {playerCost}
                </p>
            </>
    }

    const renderSuccessText = () => {
        return <>
            <p className='text-green-500'>Success! </p>
            <p>You have drafted <b>{nbaComName ? nbaComName : null}</b> to <span className='font-bold'>{teamName}</span></p>
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
                isOpen={confirmModalOpen}
                setIsOpen={setIsOpen}
            >
                <div className=" flex items-center justify-center z-50">
                    <div className=" w-80 p-6 ">
                        <h2 className="text-2xl font-semibold mb-4">Draft Confirmation</h2>
                        <p className='text-red-500'>{apiError}</p>
                        {isSuccess ?
                            renderSuccessText()
                            : renderConfirmationText()
                        }

                        <div className="flex justify-end">
                            <button
                                onClick={setIsOpen}
                                className="px-4 py-2 mr-2 text-gray-600 border border-gray-400 rounded hover:bg-gray-100"
                            >
                                {isSuccess === true ? 'Close' : 'Cancel'}
                            </button>
                            {hasEnoughCurrency && !isSuccess ?
                                <button
                                    onClick={handleAddPlayer}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-orange-f00"
                                >
                                    Confirm
                                </button>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </Modal>
            {isLoading ?
                <LoadingSpinner />
                : null
            }
        </>
    );
}

export default ConfirmationModal;
