import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center">
            <input
                type="text"
                placeholder="Search player..."
                className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border border-orange-300 rounded-lg focus:outline-none focus:ring focus:border-orange-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleKeyPress}
            />
            <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
