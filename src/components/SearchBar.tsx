import React from 'react';

import { Input } from 'antd';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div>
            <Input.Search placeholder="Search in table" onSearch={onSearch} enterButton />
        </div>
    );
};
