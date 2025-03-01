import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';

const SearchForm = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const searchHandler = () => {
        handleSearch(searchQuery.trim());
    };

    return (
        <div className="flex items-center space-x-2 justify-end px-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
                placeholder="Paieška..."
            />
            <ButtonComponent onClick={searchHandler}>Paieška</ButtonComponent>
        </div>
    );
};

export default SearchForm;