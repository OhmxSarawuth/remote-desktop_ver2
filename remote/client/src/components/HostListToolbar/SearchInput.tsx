import React, { useEffect, useState } from "react";
import { fetchTagTemplat } from "../../services/tagService";

export interface Search{
  search: string;
  tagType?: string;
}
interface SearchInputProps {
  search: string;
  tagType?: string;
  onChange: (search: string, tagType?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, tagType, onChange }) => {
  const [tagTypes, setTagTypes] = useState<string[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [selectedTagType, setSelectedTagType] = useState(tagType || "");

  useEffect(() => {
    setLoadingTypes(true);
    fetchTagTemplat()
      .then(types => setTagTypes(types))
      .finally(() => setLoadingTypes(false));
  }, []);

  const handleTagTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTagType(e.target.value);
    onChange(search, e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, selectedTagType);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="font-semibold min-w-[80px]">Search</span>
      <select
        className="border rounded px-1 py-0.5"
        value={selectedTagType}
        onChange={handleTagTypeChange}
        disabled={loadingTypes}
      >
        <option value="">{loadingTypes ? "Loading..." : "All Tag Types"}</option>
        {tagTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <input
        className="border rounded px-2 py-1"
        type="text"
        placeholder="Search host..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
