import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import CloseButton from '../../components/CloseButton/CloseButton';

const PlayerModal = () => {
    const {
        playerModalOpen,
        playerModalData,
        setPlayerModalOpen
    } = useContext(UserContext);

    return (
        <>
            <Modal
                isOpen={playerModalOpen}
                setIsOpen={() => setPlayerModalOpen(prev => !prev)}
            >
                <CloseButton setIsOpen={() => setPlayerModalOpen(prev => !prev)} />
                {playerModalData.nbaComName ?
                    <PlayerProfile player={playerModalData} />
                    : null
                }
            </Modal>
        </>
    );
}

export default PlayerModal;
