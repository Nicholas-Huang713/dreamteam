import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider(props) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <UserContext.Provider
            value={{
                modalOpen,
                setModalOpen
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}