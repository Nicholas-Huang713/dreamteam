import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { getJwt } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';
import { updateManagedTeams } from '../../store/actions/userActions';
import { createTeam, addPlayer } from '../../api/userService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';;

const ConfirmationModal = () => {
    const { currency } = useSelector(state => state.user)
    const {
        confirmModalOpen,
        setConfirmModalOpen,
        selectedPlayerToSave,
        setSelectedPlayerToSave
    } = useContext(UserContext);

    const setIsOpen = () => {
        setConfirmModalOpen(prev => !prev);
    }

    return (
        <>
            <Modal
                isOpen={confirmModalOpen}
                setIsOpen={setIsOpen}
            >
                <div className=" flex items-center justify-center z-50">
                    <div className=" w-80 p-6 ">
                        <h2 className="text-2xl font-semibold mb-4">Draft Confirmation</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to draft {selectedPlayerToSave.nbaComName ? selectedPlayerToSave.nbaComName : null} to {selectedPlayerToSave.teamName}?
                        </p>
                        <p>
                            Currency: {currency ? currency : null}
                        </p>
                        <p>
                            Cost:
                        </p>

                        <div className="flex justify-end">
                            <button
                                // onClick={onCancel}
                                className="px-4 py-2 mr-2 text-gray-600 border border-gray-400 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                // onClick={onConfirm}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-orange-f00"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ConfirmationModal;
