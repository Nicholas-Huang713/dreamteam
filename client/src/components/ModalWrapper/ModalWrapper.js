import SignUpModal from '../../pages/SignUpModal/SignUpModal';
import LoginModal from '../../pages/LoginModal/LoginModal';
import TeamModal from '../../pages/TeamModal/TeamModal';
import ArticleModal from '../../pages/ArticleModal/ArticleModal';
import ArticleListModal from '../../pages/ArticleListModal/ArticleListModal';

const ModalWrapper = () => {

    return (
        <>
            <SignUpModal />
            <LoginModal />
            <TeamModal />
            <ArticleModal />
            <ArticleListModal />
        </>
    );
}

export default ModalWrapper;
