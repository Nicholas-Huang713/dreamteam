import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { UserContext } from '../../providers/UserProvider';
import * as Yup from 'yup';

const formFields = [
    {
        name: 'firstName',
        labelName: 'First Name',
        type: 'text',
        placeHolder: 'Enter your first name',
    },
    {
        name: 'lastName',
        labelName: 'Last Name',
        type: 'text',
        placeHolder: 'Enter your last name',
    },
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
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //     'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    // ),
});

const SignUpModal = () => {
    const { signupModalOpen, setSignupModalOpen, setLoginModalOpen } = useContext(UserContext);

    const setIsOpen = () => {
        setSignupModalOpen(prev => !prev);
    }
    const openLoginModal = () => {
        setLoginModalOpen(prev => !prev);
        setSignupModalOpen(prev => !prev);
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
