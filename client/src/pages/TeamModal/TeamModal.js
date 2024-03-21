import { useState, useContext, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import { nbaTeamData } from '../../api/nbaTeamData';
import RadioButton from '../../components/RadioButton/RadioButton';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { saveAffiliation } from '../../api/userService';
import { getJwt } from '../../utils/jwt';
import { useDispatch, useSelector } from 'react-redux';
import { updateAffil } from '../../store/actions/userActions';

const TeamModal = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const { teamModalOpen, setTeamModalOpen } = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [teamColor, setTeamColor] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [teamAbbr, setTeamAbbr] = useState('');

    const setIsOpen = () => {
        if (userData?.affiliation?.team === '') return;
        closeModal();
    }

    const closeModal = () => {
        setTeamModalOpen(prev => !prev);
    }

    const handleSelectTeam = (teamName, color, displayName, abbr) => {
        setSelectedOption(teamName);
        setTeamColor(color);
        setDisplayName(displayName);
        setTeamAbbr(abbr);
    };

    const handleOnChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const saveTeam = async (e) => {
        e.preventDefault();
        const jwt = getJwt();
        const teamData = {
            team: selectedOption,
            color: teamColor,
            displayName: displayName,
            abbr: teamAbbr
        }
        try {
            const res = await axios({
                url: saveAffiliation,
                method: 'PUT',
                data: teamData,
                headers: { 'Authorization': `Bearer ${jwt}` }
            });
            dispatch(updateAffil(res.data));
            closeModal();
        } catch (e) {
            console.log('error', e)
        }
    }

    useEffect(() => {
        const setCurrentSavedTeamFromDb = () => {
            const savedTeam = userData?.affiliation?.team;
            const savedDisplayName = userData?.affiliation?.displayName;
            const savedColor = userData?.affiliation?.color;
            const savedLocation = userData?.affiliation?.location;
            const savedAbbr = userData?.affiliation?.abbr;
            if (savedTeam && savedTeam !== '') {
                setSelectedOption(savedTeam);
                setTeamColor(savedColor);
                setDisplayName(savedDisplayName);
                setTeamAbbr(savedAbbr);
            }
        }
        setCurrentSavedTeamFromDb();

        return () => {
            setSelectedOption('');
            setTeamColor('');
            setDisplayName('');
            setTeamAbbr('');
        }
    }, [userData])

    return (
        <>
            <Modal
                isOpen={teamModalOpen}
                setIsOpen={setIsOpen}
            >
                <div className="flex flex-wrap justify-between items-center w-full">
                    <h1>Choose Your Affiliation</h1>
                    {selectedOption !== '' ?
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                            onClick={saveTeam}
                        >
                            Save
                        </button>
                        : null
                    }
                </div>
                <ul className="divide-y divide-gray-100 mt-1">
                    {nbaTeamData && nbaTeamData.map((team) => (
                        <li
                            key={team.abbr}
                            className={`flex justify-between gap-x-6 py-5 transition-colors duration-300 ease-in-out`}
                            style={{ backgroundColor: selectedOption === team.name ? `#${team.color}` : '' }}
                            onClick={() => handleSelectTeam(team.name, team.color, team.displayName, team.abbr)}
                        >
                            <div className="flex min-w-0 gap-x-4 ml-5" >
                                <RadioButton
                                    value={team.name}
                                    checked={selectedOption === team.name}
                                    onChange={handleOnChange}
                                />
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50 shadow-sm" src={team.logoLink} alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className={`text-sm font-semibold leading-6 ${selectedOption === team.name ? 'text-white' : 'text-gray-900'}`}>{team.displayName}</p>
                                    <p className={`mt-1 truncate text-xs leading-5 ${selectedOption === team.name ? 'text-white' : 'text-gray-500'}`}>{team.abbr}</p>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    {selectedOption !== '' ?
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                            onClick={saveTeam}
                        >
                            Save
                        </button>
                        : null
                    }
                </div>
            </Modal >
        </>
    );
}

export default TeamModal;
