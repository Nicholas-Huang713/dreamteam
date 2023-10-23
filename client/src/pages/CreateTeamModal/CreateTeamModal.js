import { useState, useContext, useEffect } from 'react';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { useDispatch } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import * as Yup from 'yup';
import { createTeam } from '../../api/userService';
import axios from 'axios';
import { updateManagedTeams } from '../../store/actions/userActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { getJwt } from '../../utils/jwt';

const formFields = [
    {
        name: 'teamName',
        type: 'text',
        labelName: 'Name',
        placeHolder: 'Enter a team name',
        key: 'teamNameKey'
    },
    {
        name: 'teamColor',
        labelName: "Choose a team color",
        type: 'color',
        placeHolder: 'Choose a team color',
        key: 'chooseColorKey'
    },
];

const createTeamSchema = Yup.object().shape({
    teamName: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(12, 'Name cannot be more than 12 characters')
        .required('Required'),
});

const initialValuesObj = { teamName: '' };

const CreateTeamModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const {
        createTeamModalOpen,
        setCreateTeamModalOpen,
        selectedPlayerToSave,
        setSelectedPlayerToSave,
        setConfirmModalOpen
    } = useContext(UserContext);

    const handleCreateNewTeam = async (values) => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const createTeamResponse = await axios.put(createTeam, values, { headers: { 'Authorization': `Bearer ${jwt}` } });
            const { updatedTeamList, newTeamId, newTeamName } = createTeamResponse.data;
            if (selectedPlayerToSave.nbaComName) {
                const savePlayerData = { teamId: newTeamId, teamName: newTeamName, ...selectedPlayerToSave };
                setSelectedPlayerToSave(savePlayerData);
                setIsLoading(prev => !prev);
                setConfirmModalOpen(prev => !prev);
                setCreateTeamModalOpen(prev => !prev);
            } else {
                dispatch(updateManagedTeams(updatedTeamList));
            }
            setApiError('')
            navigate('/dashboard/myteam');

        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data)
            setIsLoading(false);
        }
    };

    const setIsOpen = () => {
        setCreateTeamModalOpen(prev => !prev);
    }

    useEffect(() => {
        return () => {
            setApiError('');
            setSelectedPlayerToSave({});
        }
    }, [])

    return (
        <>
            <Modal
                isOpen={createTeamModalOpen}
                setIsOpen={setIsOpen}
            >
                <FormWrapper
                    formFields={formFields}
                    validationSchema={createTeamSchema}
                    formTitle="Create a new team"
                    initialValuesObj={initialValuesObj}
                    displayCancelBtn={true}
                    displaySubmitBtn={true}
                    isOpen={createTeamModalOpen}
                    setIsOpen={setIsOpen}
                    submitText={"Create"}
                    handleSubmit={handleCreateNewTeam}
                    apiError={apiError}
                />
            </Modal>
            {isLoading ? <LoadingSpinner /> : null}
        </>

    );
}

export default CreateTeamModal;
