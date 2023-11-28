import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider(props) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [teamModalOpen, setTeamModalOpen] = useState(false);
    const [articleModalData, setArticleModalData] = useState({});
    const [articleModalOpen, setArticleModalOpen] = useState(false);
    const [articleListModalData, setArticleListModalData] = useState([]);
    const [articleListModalOpen, setArticleListModalOpen] = useState(false);
    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [playerModalData, setPlayerModalData] = useState({});
    const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
    const [selectedPlayerToSave, setSelectedPlayerToSave] = useState({});
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [dropPlayerModalOpen, setDropPlayerModalOpen] = useState(false);
    const [selectedPlayerToDrop, setSelectedPlayerToDrop] = useState({});
    const [selectedTeamData, setSelectedTeamData] = useState({});
    const [selectedTeamToPlay, setSelectedTeamToPlay] = useState({});
    const [playTeamModalOpen, setPlayTeamModalOpen] = useState(false);

    return (
        <UserContext.Provider
            value={{
                selectedTeamToPlay,
                setSelectedTeamToPlay,
                playTeamModalOpen,
                setPlayTeamModalOpen,
                loginModalOpen,
                setLoginModalOpen,
                signupModalOpen,
                setSignupModalOpen,
                teamModalOpen,
                setTeamModalOpen,
                articleModalData,
                setArticleModalData,
                articleModalOpen,
                setArticleModalOpen,
                articleListModalOpen,
                setArticleListModalOpen,
                setArticleListModalData,
                articleListModalData,
                playerModalOpen,
                setPlayerModalOpen,
                playerModalData,
                setPlayerModalData,
                createTeamModalOpen,
                setCreateTeamModalOpen,
                selectedPlayerToSave,
                setSelectedPlayerToSave,
                confirmModalOpen,
                setConfirmModalOpen,
                dropPlayerModalOpen,
                setDropPlayerModalOpen,
                selectedPlayerToDrop,
                setSelectedPlayerToDrop,
                selectedTeamData,
                setSelectedTeamData
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}