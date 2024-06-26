import SignUpModal from '../../pages/SignUpModal/SignUpModal';
import LoginModal from '../../pages/LoginModal/LoginModal';
import TeamModal from '../../pages/TeamModal/TeamModal';
import ArticleModal from '../../pages/ArticleModal/ArticleModal';
import ArticleListModal from '../../pages/ArticleListModal/ArticleListModal';
import PlayerModal from '../../pages/PlayerModal/PlayerModal';
import CreateTeamModal from '../../pages/CreateTeamModal/CreateTeamModal';
import ConfirmationModal from '../../pages/ConfirmationModal/ConfirmationModal';
import DropPlayerModal from '../../pages/DropPlayerModal/DropPlayerModal';
import PlayTeamModal from '../../pages/PlayTeamModal/PlayTeamModal';

const ModalWrapper = () => {

    return (
        <>
            <SignUpModal />
            <LoginModal />
            <TeamModal />
            <ArticleModal />
            <ArticleListModal />
            <PlayerModal />
            <CreateTeamModal />
            <ConfirmationModal />
            <DropPlayerModal />
            <PlayTeamModal />
        </>
    );
}

export default ModalWrapper;
