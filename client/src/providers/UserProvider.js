import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider(props) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [teamModalOpen, setTeamModalOpen] = useState(false);

    return (
        <UserContext.Provider
            value={{
                loginModalOpen,
                setLoginModalOpen,
                signupModalOpen,
                setSignupModalOpen,
                teamModalOpen,
                setTeamModalOpen
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}