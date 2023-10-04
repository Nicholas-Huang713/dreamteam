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
                articleListModalData
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}