import React, { useState } from "react";
import { Input } from "antd";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <Input.Search
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
      enterButton
    />
  );
};

