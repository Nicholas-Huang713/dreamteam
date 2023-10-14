import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500">
            <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
