import React from 'react';

import { Input } from 'antd';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div>
            <Input.Search placeholder="Поиск..." onSearch={onSearch} enterButton />
        </div>
    );
};
