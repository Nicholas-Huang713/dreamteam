import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='w-full flex items-center justify-center m-5'>
            <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>

    );
};

export default LoadingSpinner;
