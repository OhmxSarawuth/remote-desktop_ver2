import React, { useState } from "react";
import { HostTag } from "../../services/tagService";

interface TagStackProps {
  tags: HostTag[];
  onChange: (selectedTags: string[]) => void;
}

const TagStack: React.FC<TagStackProps> = ({ tags, onChange }) => {
  // Store selected tagId (GUID) array
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [newTagId, setNewTagId] = useState("");

  const handleAdd = () => {
    if (newTagId && !selectedTagIds.includes(newTagId)) {
      const updated = [...selectedTagIds, newTagId];
      setSelectedTagIds(updated);
      onChange(updated);
      setNewTagId("");
      setAdding(false);
    }
  };
  const handleRemove = (tagId: string) => {
    const updated = selectedTagIds.filter(t => t !== tagId);
    setSelectedTagIds(updated);
    onChange(updated);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedTagIds.map(tagId => {
        const tagObj = tags.find(t => t.tag_id.toString() === tagId);
        return (
          <span key={tagId} className="flex items-center px-2 py-1 bg-blue-200 rounded-full text-xs">
            {tagObj ? tagObj.tag_type : tagId}
            <button className="ml-1 text-red-500" onClick={() => handleRemove(tagId)}>-</button>
          </span>
        );
      })}
      {adding ? (
        <>
          <select
            className="border rounded px-2 py-1"
            value={newTagId}
            onChange={e => setNewTagId(e.target.value)}
          >
            <option value="">Select tag</option>
            {tags.filter(t => !selectedTagIds.includes(t.tag_id.toString())).map(tag => (
              <option key={tag.tag_id} value={tag.tag_id.toString()}>{tag.tag_type}</option>
            ))}
          </select>
          <button className="ml-1 px-2 py-1 bg-green-500 text-white rounded" onClick={handleAdd}>Add</button>
          <button className="ml-1 px-2 py-1 bg-gray-300 rounded" onClick={() => setAdding(false)}>Cancel</button>
        </>
      ) : (
        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setAdding(true)}>+</button>
      )}
    </div>
  );
};

export default TagStack;
