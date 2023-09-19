import { useContext } from 'react';
import Modal from '../Modal/Modal';
import { UserContext } from '../../providers/UserProvider';

const ModalWrapper = () => {
    const { modalOpen } = useContext(UserContext);

    return (
        <>
            {modalOpen ? <Modal /> : null}
        </>
    );
}

export default ModalWrapper;
