import { useContext } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { UserContext } from '../../providers/UserProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Name must be more than 2 characters')
        .max(50, 'Name cannot be more than 50 characters')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Name must be more than 2 characters')
        .max(50, 'Name cannot be more than 50 characters')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required("Password is required")
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        ),
});

export default function FormWrapper() {
    const { setModalOpen } = useContext(UserContext);

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                // validate={values => {
                //     const errors = {};
                //     if (!values.email) {
                //         errors.email = 'Required';
                //     } else if (
                //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     ) {
                //         errors.email = 'Invalid email address';
                //     }
                //     return errors;
                // }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Create an Account</h2>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.firstName && touched.firstName ?
                                                <div>{errors.firstName}</div>
                                                : null}


                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.lastName && touched.lastName ?
                                                <div>{errors.lastName}</div>
                                                : null}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.email && touched.email ?
                                                <div>{errors.email}</div>
                                                : null}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="password"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.password && touched.password ?
                                                <div>{errors.password}</div>
                                                : null}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
