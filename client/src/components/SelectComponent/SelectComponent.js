import React, { useState, useEffect } from 'react';

const SelectComponent = ({ currentOptions, showLabel, defaultVal, handleOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        handleOptionChange && handleOptionChange(e.target.value);
    };

    useEffect(() => {
        defaultVal && setSelectedOption(defaultVal);
        return () => setSelectedOption('')
    }, [defaultVal])

    return (
        <div>
            {showLabel ?
                <label htmlFor="select" className="block text-sm font-medium text-gray-700">
                    Select an Option
                </label> : null
            }

            <select
                id="select"
                name="select"
                value={selectedOption}
                onChange={handleSelectChange}
                aria-label="Select an option"
                className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
                <option value='select team' disabled>Select Team</option>

                {currentOptions.length > 0 ?
                    (currentOptions.map((data, index) => (
                        <option value={data.value} key={`${data.value}-${index}`}>{data.value} </option>
                    ))
                    )
                    : null
                }
            </select>
        </div>
    );
};

export default SelectComponent;
