import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { updateUser } from '../../api/userService';

const Profile = () => {
    const currentUser = useSelector((store) => store.user);
    const { firstName, lastName, email } = currentUser;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Add your form submission logic here
    //     console.log('Form submitted:', formData);
    // };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        console.log(`Input "${name}" value on blur:`, value);

    };

    useEffect(() => {
        setFormData({
            firstName,
            lastName,
            email
        });

    }, [currentUser])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            // onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        // placeholder="First Name"
                        onBlur={handleBlur}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        // placeholder="Last Name"
                        onBlur={handleBlur}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        // placeholder="Email"
                        onBlur={handleBlur}
                    />
                </div>
                {/* <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div> */}
                {/* <div className="flex items-center justify-between">
                    <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Profile;
