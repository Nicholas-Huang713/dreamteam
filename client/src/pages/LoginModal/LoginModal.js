import { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { UserContext } from '../../providers/UserProvider';
import * as Yup from 'yup';
import axios from 'axios';
import { loginUser, getGamesPlayed } from '../../api/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserData, updateManagedTeams, updateGamesPlayed } from '../../store/actions/userActions';
import { updateTopGames } from '../../store/actions/topGameActions';
import { getJwt } from '../../utils/jwt';
import { getOwnedTeams, getTopGames } from '../../api/userService';
import CloseButton from '../../components/CloseButton/CloseButton';

const formFields = [
    {
        name: 'email',
        type: 'email',
        labelName: 'Email',
        placeHolder: 'Enter your email',
        key: 'loginemailkey'
    },
    {
        name: 'password',
        labelName: "Password",
        type: 'password',
        placeHolder: 'Enter your password',
        key: 'loginpasswordkey'
    },
];

const initialValuesObj = { email: '', password: '' };

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required("Password is required")
});

const LoginModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        loginModalOpen,
        setLoginModalOpen,
        setSignupModalOpen,
        setTeamModalOpen
    } = useContext(UserContext);
    const [apiError, setApiError] = useState('');

    const setIsOpen = () => {
        setLoginModalOpen(prev => !prev);
    }

    const openSignUpModal = () => {
        setSignupModalOpen(true)
        setLoginModalOpen(false)
    };
    const handleLogin = async (values) => {
        try {
            const response = await axios.post(loginUser, values);
            const data = response.data;
            localStorage.setItem('token', data.token);
            const filteredUserData = { ...data.user };
            delete filteredUserData.password;
            dispatch(updateUserData(filteredUserData));
            const jwt = getJwt();
            const teamResponse = await axios.get(getOwnedTeams, { headers: { 'Authorization': `Bearer ${jwt}` } });
            dispatch(updateManagedTeams(teamResponse.data));
            const gamesPlayedResponse = await axios.get(getGamesPlayed, { headers: { 'Authorization': `Bearer ${jwt}` } });
            const topGamesResponse = await axios.get(getTopGames, { headers: { 'Authorization': `Bearer ${jwt}` } });
            dispatch(updateTopGames(topGamesResponse.data))

            dispatch(updateGamesPlayed(gamesPlayedResponse.data))
            navigate('/dashboard/home');
            setLoginModalOpen(false);
            data.user.affilliation.team === '' && setTeamModalOpen(true);
        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data)
        }
    }

    return (
        <>
            <Modal
                isOpen={loginModalOpen}
                setIsOpen={setIsOpen}
            >
                <CloseButton setIsOpen={setIsOpen} />
                <FormWrapper
                    formFields={formFields}
                    validationSchema={loginSchema}
                    formTitle="Sign in"
                    initialValuesObj={initialValuesObj}
                    displayCancelBtn={true}
                    displaySubmitBtn={true}
                    isOpen={loginModalOpen}
                    setIsOpen={setIsOpen}
                    submitText={"Sign in"}
                    handleSubmit={handleLogin}
                    apiError={apiError}
                >
                    <div className="flex justify-center items-center mb-10 mt-5">
                        <button
                            type="button"
                            onClick={openSignUpModal}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            Create a new DreamTeam account
                        </button>
                    </div>
                </FormWrapper>
            </Modal>
        </>
    );
}

export default LoginModal;