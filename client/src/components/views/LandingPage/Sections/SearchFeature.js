import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchFeature = props => {

    const [searchTerms, setSearchTerms] = useState('');

    const handleChange = e => {
        setSearchTerms(e.currentTarget.value);

        // update the parent state and UI
        props.refreshFunction(e.currentTarget.value);
    };

    return (
        <div>
            <Search
                value={searchTerms}
                onChange={handleChange}
                placeholder="Search By Typing..."
            />
        </div>
    )
};

export default SearchFeature;