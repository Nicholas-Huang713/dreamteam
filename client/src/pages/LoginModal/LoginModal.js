import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { UserContext } from '../../providers/UserProvider';
import * as Yup from 'yup';

const formFields = [
    {
        name: 'email',
        type: 'email',
        labelName: 'Email',
        placeHolder: 'Enter your email',
    },
    {
        name: 'password',
        labelName: "Password",
        type: 'password',
        placeHolder: 'Enter your password',
    },
];

const initialValuesObj = { email: '', password: '' };

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required("Password is required")
});

const LoginModal = () => {
    const {
        loginModalOpen,
        setLoginModalOpen,
        setSignupModalOpen
    } = useContext(UserContext);

    const setIsOpen = () => {
        setLoginModalOpen(prev => !prev);
    }

    const openSignUpModal = () => {
        setSignupModalOpen(prev => !prev)
        setLoginModalOpen(prev => !prev)
    };

    return (
        <>
            <Modal
                isOpen={loginModalOpen}
                setIsOpen={setIsOpen}
            >
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
                >
                    <div className="flex justify-center items-center mb-10 mt-5">
                        <button
                            type="submit"
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