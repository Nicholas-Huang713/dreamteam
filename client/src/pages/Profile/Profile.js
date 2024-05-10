import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { updateFirstName, updateLastName } from '../../store/actions/userActions'
import { updateUser } from '../../api/userService';
import axios from 'axios';
import { getJwt } from '../../utils/jwt';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((store) => store.user);
    const { firstName, lastName, email, affiliation, managedTeams, gameHistory } = currentUser;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

    };

    const hasNameErrors = (name, value) => {
        if (value.length < 2) {
            name === 'firstName' ? setFirstNameError('First name must be more than 2 characters')
                : setLastNameError('Last name must be more than 2 characters')
            return true;
        }
        if (value.length > 10) {
            name === 'firstName' ? setFirstNameError('First name must not be more than 10 characters')
                : setLastNameError('Last name must not be more than 10 characters');
            return true
        }
        return false;
    };

    const handleSaveName = async (name, value) => {
        const jwt = getJwt();
        const saveData = {
            name, value
        }
        try {
            const response = await axios.put(updateUser, saveData, { headers: { 'Authorization': `Bearer ${jwt}` } });
            name === 'firstName' ? dispatch(updateFirstName(value)) : dispatch(updateLastName(value))

        } catch (e) {
            console.log('error', e)
        }
    };

    const handleSubmit = (name, value) => {
        switch (name) {
            case "firstName":
                if (hasNameErrors(name, value)) return;
                handleSaveName(name, value)
                break;
            case "lastName":
                if (hasNameErrors(name, value)) return;
                handleSaveName(name, value);
                break;
            default:
                return;
        }
        console.log('Form submitted:', formData);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "firstName" && value === formData.firstName) return;
        if (name === "lastName" && value === formData.lastName) return;
        handleSubmit(name, value);
    };

    useEffect(() => {
        setFormData({
            firstName,
            lastName,
            email
        });

    }, [currentUser])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <div className="text-gray-800">{formData.firstName}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <div className="text-gray-800">{formData.lastName}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <div className="text-gray-800">{formData.email}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managedTeams">
                        Teams Managed
                    </label>
                    <div className="text-gray-800">{managedTeams.length}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gamePlayed">
                        Games Played
                    </label>
                    <div className="text-gray-800">{gameHistory.length}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="affiliation">
                        Affiliation
                    </label>
                    <div className="text-gray-800">{affiliation.team}</div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
