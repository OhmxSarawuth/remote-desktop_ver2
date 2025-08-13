import React, { useEffect, useState } from "react";


import { fetchTagTemplat } from "../../services/tagService";


export interface GroupStackItem {
  tagType: string;
}

interface GroupBarProps {
  
  value: GroupStackItem[];
  onChange: (stack: GroupStackItem[]) => void;
}

const GroupBar: React.FC<GroupBarProps> = ({ value, onChange }) => {
  const [tagTypes, setTagTypes] = useState<string[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  useEffect(() => {
    setLoadingTypes(true);
    fetchTagTemplat()
      .then(types => setTagTypes(types))
      .finally(() => setLoadingTypes(false));
  }, []);

  const handleTagTypeChange = (idx: number, tagType: string) => {
    const newStack = value.map((item, i) =>
      i === idx ? { tagType } : item
    );
    onChange(newStack);
  };

  const handleRemove = (idx: number) => {
    const newStack = value.filter((_, i) => i !== idx);
    onChange(newStack);
  };

  const handleAdd = () => {
    onChange([...value, { tagType: "" }]);
  };



  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="font-semibold min-w-[80px]">Group</span>
      {value.map((item, idx) => (
        <div key={idx} className="flex flex-row gap-1 items-center border rounded px-2 py-1 bg-gray-50">
          <select
            className="border rounded px-1 py-0.5"
            value={item.tagType}
            onChange={e => handleTagTypeChange(idx, e.target.value)}
            disabled={loadingTypes}
          >
            <option value="">{loadingTypes ? "Loading..." : "Select Tag Type"}</option>
            {tagTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            className="ml-1 text-red-500 hover:text-red-700"
            onClick={() => handleRemove(idx)}
            type="button"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="border rounded px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700"
        onClick={handleAdd}
        type="button"
        title="Add Group"
      >
        +
      </button>
    </div>
  );
};

export default GroupBar;
