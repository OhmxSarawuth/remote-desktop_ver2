

import React, { useEffect, useState } from "react";
import { fetchTagTemplat, fetchTagInfos } from "../../services/tagService";

export interface FilterStackItem {
  tagType: string;
  tagInfo?: string;
}

interface FilterSelectProps {
  value: FilterStackItem[];
  onChange: (stack: FilterStackItem[]) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange }) => {
  const [tagTypes, setTagTypes] = useState<string[]>([]);
  const [tagInfos, setTagInfos] = useState<{ [idx: number]: string[] }>({});
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingInfos, setLoadingInfos] = useState<{ [idx: number]: boolean }>({});

  // Fetch tag types on mount
  useEffect(() => {
    setLoadingTypes(true);
    fetchTagTemplat()
      .then(types => setTagTypes(types))
      .finally(() => setLoadingTypes(false));
  }, []);

  // Fetch tag infos for each filter row
  useEffect(() => {
    value.forEach((item, idx) => {
      if (item.tagType) {
        setLoadingInfos(prev => ({ ...prev, [idx]: true }));
        fetchTagInfos(item.tagType)
          .then(infos => {
            setTagInfos(prev => ({ ...prev, [idx]: Array.isArray(infos) ? infos : [] }));
            // If current tagInfo is not in new infos, reset it
            if (item.tagInfo && !infos.includes(item.tagInfo)) {
              const newStack = value.map((v, i) => i === idx ? { ...v, tagInfo: undefined } : v);
              onChange(newStack);
            }
          })
          .catch(() => {
            setTagInfos(prev => ({ ...prev, [idx]: [] }));
          })
          .finally(() => setLoadingInfos(prev => ({ ...prev, [idx]: false })));
      } else if (tagInfos[idx]) {
        setTagInfos(prev => {
          const copy = { ...prev };
          delete copy[idx];
          return copy;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleTagTypeChange = (idx: number, tagType: string) => {
    const newStack = value.map((item, i) =>
      i === idx ? { tagType, tagInfo: undefined } : item
    );
    onChange(newStack);
  };

  const handleTagInfoChange = (idx: number, tagInfo: string) => {
    const newStack = value.map((item, i) =>
      i === idx ? { ...item, tagInfo } : item
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
      <span className="font-semibold min-w-[80px]">Filter</span>
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
          {item.tagType && tagInfos[idx] && tagInfos[idx].length > 0 && (
            <select
              className="border rounded px-1 py-0.5 ml-1"
              value={item.tagInfo || ""}
              onChange={e => handleTagInfoChange(idx, e.target.value)}
              disabled={loadingInfos[idx]}
            >
              <option value="">{loadingInfos[idx] ? "Loading..." : "Select Info"}</option>
              {tagInfos[idx].map(info => (
                <option key={info} value={info}>{info}</option>
              ))}
            </select>
          )}
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
        title="Add Tag Filter"
      >
        +
      </button>
    </div>
  );
};

export default FilterSelect;
