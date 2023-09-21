import { Formik, Form, Field, useFormik } from 'formik';

export default function FormWrapper({
    formFields,
    validationSchema,
    formTitle,
    initialValuesObj,
    displayCancelBtn,
    displaySubmitBtn,
    submitText,
    cancelText,
    setIsOpen,
    children
}) {

    const errorCheck = (formName, errors, touched) => {
        let hasError;
        if (formName === 'firstName') hasError = errors.firstName && touched.firstName;
        if (formName === 'lastName') hasError = errors.lastName && touched.lastName;
        if (formName === 'email') hasError = errors.email && touched.email;
        if (formName === 'password') hasError = errors.password && touched.password;
        return hasError;
    };

    const errorName = (name, errors) => {
        let errorMessage;
        if (name === 'firstName') errorMessage = errors.firstName;
        if (name === 'lastName') errorMessage = errors.lastName;
        if (name === 'email') errorMessage = errors.email;
        if (name === 'password') errorMessage = errors.password;
        return errorMessage;
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
            <div className="overflow-y-auto max-h-[80vh]">
                <Formik
                    initialValues={initialValuesObj}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            console.log(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            resetForm();
                        }, 400);

                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                {formFields.map((data) => {
                                    const { name, placeHolder, labelName, type } = data;
                                    return (
                                        <>
                                            <label htmlFor={name} className="block text-gray-700 font-bold">
                                                {labelName}
                                            </label>
                                            <Field
                                                type={type}
                                                id={name}
                                                name={name}
                                                placeholder={placeHolder}
                                                className={`form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                            />
                                            {errorCheck(name, errors, touched) ?
                                                <div className="text-red-500">{errorName(name, errors)}</div>
                                                : null
                                            }
                                        </>
                                    )
                                })}
                            </div>
                            <>
                                {children}
                            </>
                            <div className="mt-4">
                                {displayCancelBtn ?
                                    (<button
                                        type="button"
                                        onClick={setIsOpen}
                                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300"
                                    >
                                        {cancelText ? cancelText : 'Cancel'}
                                    </button>) :
                                    null
                                }
                                {displaySubmitBtn ?
                                    (<button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                    >
                                        {submitText ? submitText : 'Submit'}
                                    </button>) : null
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
