import React from 'react';
import { TwitterPicker } from 'react-color';

const ColorSelector = ({ handleColorChange, color }) => {
    return (
        <div className="flex flex-col items-center m-4">
            <div className="w-auto m-2 p-2 border border-gray-300 rounded-lg">
                <TwitterPicker
                    color={color}
                    onChange={handleColorChange}
                />
            </div>
            <div className="w-20 h-20 pl-5 flex justify-center items-center text-white font-bold bg-gray-500 rounded-full m-2" style={{ backgroundColor: color }}>
                Team Color
            </div>
        </div>
    );
};

export default ColorSelector;
