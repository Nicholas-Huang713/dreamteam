import { useContext, useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { getJwt } from '../../utils/jwt';
import { updateManagedTeams } from '../../store/actions/userActions';
import { removePlayer } from '../../api/userService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useDispatch } from 'react-redux';

const DropPlayerModal = () => {
    const dispatch = useDispatch();
    const {
        dropPlayerModalOpen,
        selectedPlayerToDrop,
        setSelectedPlayerToDrop,
        setDropPlayerModalOpen,
        setSelectedTeamData,
        selectedTeamData
    } = useContext(UserContext);
    const {
        nbaComName,
        teamName,
    } = selectedPlayerToDrop;

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState('');

    const setIsOpen = () => {
        setDropPlayerModalOpen(prev => !prev);
        setApiError('');
        setIsSuccess(false);
        setSelectedPlayerToDrop({});
    }


    const renderConfirmationText = () => {
        return <>
            <p className="text-gray-700 mb-6">
                Are you sure you want to drop <b>{nbaComName ? nbaComName : null}</b> from <b>{teamName ? teamName : null}</b> ?
            </p>
        </>

    }

    const renderSuccessText = () => {
        return <>
            <p className='text-green-500'>Success!</p>
            <p><b>{nbaComName ? nbaComName : null}</b> has been removed from <span className='font-bold'>{teamName}</span></p>
        </>
    }

    const handleDropPlayer = async (player) => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const res = await axios.put(removePlayer, player, { headers: { 'Authorization': `Bearer ${jwt}` } });
            const currentTeamSelected = res.data.filter((team) => team.teamName === selectedTeamData.teamName);
            dispatch(updateManagedTeams(res.data));
            setIsLoading(false);
            setSelectedTeamData(currentTeamSelected[0]);
            setIsSuccess(true);
            setApiError('');
        } catch (err) {
            console.log('err: ', err);
            setApiError(err.response.data);
            setIsSuccess(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            setIsSuccess(false);
            setApiError('');
            setSelectedPlayerToDrop({});
        }
    }, [])

    return (
        <>
            <Modal
                isOpen={dropPlayerModalOpen}
                setIsOpen={setIsOpen}
            >
                <div className=" flex items-center justify-center z-50">
                    <div className=" w-80 p-6 ">
                        <h2 className="text-2xl font-semibold mb-4">Drop Confirmation</h2>
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
                                {isSuccess ? 'Close' : 'Cancel'}
                            </button>
                            {!isSuccess ?
                                <button
                                    onClick={() => handleDropPlayer(selectedPlayerToDrop)}
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

export default DropPlayerModal;
