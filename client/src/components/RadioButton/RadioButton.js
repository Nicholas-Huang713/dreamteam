import React from 'react';

function RadioButton({ value, checked, onChange }) {
    return (
        <label className="flex items-center">
            <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
}

export default RadioButton;
