import { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { UserContext } from '../../providers/UserProvider';
import { newUser } from '../../api/userService';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../store/actions/userActions';

const formFields = [
    {
        name: 'firstName',
        labelName: 'First Name',
        type: 'text',
        placeHolder: 'Enter your first name',
        key: 'signupfirstNameKey'
    },
    {
        name: 'lastName',
        labelName: 'Last Name',
        type: 'text',
        placeHolder: 'Enter your last name',
        key: 'signuplastNameKey'
    },
    {
        name: 'email',
        type: 'email',
        labelName: 'Email',
        placeHolder: 'Enter your email',
        key: 'signupemailkey'
    },
    {
        name: 'password',
        labelName: "Password",
        type: 'password',
        placeHolder: 'Enter your password',
        key: 'signuppasswordkey'
    },
];

const initialValuesObj = { firstName: '', lastName: '', email: '', password: '' };

const signupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot be more than 50 characters')
        .required('First name required'),
    lastName: Yup.string()
        .min(2, 'Name must be more than 2 characters')
        .max(50, 'Name cannot be more than 50 characters')
        .required('Last name required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required("Password is required")
        .min(8, 'Password must be at least 8 characters')
});

const SignUpModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setTeamModalOpen, signupModalOpen, setSignupModalOpen, setLoginModalOpen } = useContext(UserContext);
    const [apiError, setApiError] = useState('');
    const setIsOpen = () => {
        setSignupModalOpen(prev => !prev);
    }
    const openLoginModal = () => {
        setLoginModalOpen(prev => !prev);
        setSignupModalOpen(prev => !prev);
    };

    const handleSignUp = async (values) => {
        try {
            const response = await axios.post(newUser, values);
            const data = response.data;
            const token = data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard')
            dispatch(updateUserData(data.user));
            console.log(token);
            // data.user.affilliation.team === '' && 
            setTeamModalOpen(true);
            setSignupModalOpen(false);

        } catch (err) {
            console.log('err: ', err)
            setApiError(err.response.data)
        }
    };

    return (
        <>
            <Modal
                isOpen={signupModalOpen}
                setIsOpen={setIsOpen}
            >
                <FormWrapper
                    formFields={formFields}
                    validationSchema={signupSchema}
                    formTitle="Create an account"
                    initialValuesObj={initialValuesObj}
                    displayCancelBtn={true}
                    displaySubmitBtn={true}
                    isOpen={signupModalOpen}
                    setIsOpen={setIsOpen}
                    handleSubmit={handleSignUp}
                    apiError={apiError}
                >

                </FormWrapper>
                <div className="flex justify-center items-center mb-10 mt-5">
                    Already have an account?&nbsp;
                    <button
                        type="button"
                        onClick={openLoginModal}
                        className="text-orange-500 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default SignUpModal;
