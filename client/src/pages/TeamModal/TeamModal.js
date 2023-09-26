import React from 'react';
import Modal from '../../components/Modal/Modal';

const TeamModal = () => {

    const setIsOpen = (value) => {
        console.log("SetIsOpen")
    }
    return (
        <>
            <Modal
                isOpen={true}
                setIsOpen={setIsOpen}
            >
                Team Modal
            </Modal>
        </>
    );
}

export default TeamModal;
