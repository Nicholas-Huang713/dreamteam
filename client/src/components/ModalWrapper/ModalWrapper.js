import { useContext } from 'react';
import Modal from '../Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import SignUpModal from '../SignUpModal/SignUpModal';

const ModalWrapper = () => {
    const { modalOpen } = useContext(UserContext);

    return (
        <>
            {/* {modalOpen ? <SignUpModal /> : null} */}
            <SignUpModal />
        </>
    );
}

export default ModalWrapper;
