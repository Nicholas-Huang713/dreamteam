import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider(props) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);

    return (
        <UserContext.Provider
            value={{
                loginModalOpen,
                setLoginModalOpen,
                signupModalOpen,
                setSignupModalOpen
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}