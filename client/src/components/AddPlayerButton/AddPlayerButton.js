import { useState, useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { UserContext } from '../../providers/UserProvider';

const AddPlayerButton = ({ size, player }) => {
    const {
        createTeamModalOpen,
        setCreateTeamModalOpen,
        selectedPlayerToSave,
        setSelectedPlayerToSave,
        setPlayerModalOpen,
        confirmModalOpen,
        setConfirmModalOpen
    } = useContext(UserContext);
    const { managedTeams, } = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [currentManagedTeams, setCurrentManagedTeams] = useState([]);
    const dropdownRef = useRef(null);

    const handleOpenDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleOpenConfirmModal = async (teamId, teamName, player) => {
        const playerWithTeamId = { teamId, teamName, ...player };
        setSelectedPlayerToSave(playerWithTeamId);
        setConfirmModalOpen(prev => !prev);
    };

    const handleOpenCreateTeamModal = () => {
        setCreateTeamModalOpen(prev => !prev);
        setSelectedPlayerToSave(player);
        setPlayerModalOpen(prev => !prev);
    };

    const renderCreateTeamButton = () => {
        return <button
            onClick={handleOpenCreateTeamModal}
            className="block px-4 py-2 font-bold text-orange-500 hover:bg-orange-100 w-full"
        >
            +Create new team
        </button>
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setCurrentManagedTeams(managedTeams);
    }, [])

    return (
        <div ref={dropdownRef}>
            <button
                className={`w-${size} h-${size} rounded-full bg-orange-300 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600`}
                onClick={handleOpenDropdown}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 m-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-2">
                        <div
                            className="flex border-b-2 border-orange-500 text-center justify-center font-bold text-gray-"
                        >
                            Draft to a team
                        </div>
                        {currentManagedTeams.length > 0 && currentManagedTeams[0].teamName ?
                            currentManagedTeams.map((team) => {
                                const hasPlayer = team.roster.some(data => data.playerID === player.playerID);
                                if (hasPlayer) return;
                                return <button
                                    key={team.id + 'key'}
                                    onClick={() => handleOpenConfirmModal(team.id, team.teamName, player)}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    {team.teamName}
                                </button>
                            })
                            :
                            null
                        }
                        {renderCreateTeamButton()}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default AddPlayerButton;
