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

    return (
        <UserContext.Provider
            value={{
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
                setSelectedPlayerToSave
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}