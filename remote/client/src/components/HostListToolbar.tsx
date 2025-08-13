
import React, { useState, useEffect, useMemo } from "react";

import FilterSelect, { FilterStackItem } from "./HostListToolbar/FilterSelect";
import SearchInput , {Search} from "./HostListToolbar/SearchInput";
import GroupBar, { GroupStackItem } from "./HostListToolbar/GroupBar";

import { fetchTagTemplat } from "../services/tagService";


interface HostListToolbarProps {
  groupStack : GroupStackItem[]
  onSetGroup: (groups: GroupStackItem[])  => void;
  filterStack: FilterStackItem[]
  onSetFilter: (stack: FilterStackItem[]) =>void;
  search: Search;
  onSearchChange : (search: Search) => void;
}

const HostListToolbar: React.FC<HostListToolbarProps> = ({ groupStack, onSetGroup , filterStack  ,onSetFilter , search, onSearchChange}: HostListToolbarProps) => {
  
  // Get all unique tags from api get tag template from esrvice tag.service.ts
  const [allTags, setAllTags] = useState<string[]>([]);
  useEffect(() => {
    fetchTagTemplat().then(setAllTags);
  }, []);
  // Filter and send hosts/groups to parent
  

  return (
    <div className="">
      <SearchInput
        search={search.search}
        tagType={search.tagType}
        onChange={(searchStr, tagType) => onSearchChange({ search: searchStr, tagType })}
      />
      <FilterSelect value={filterStack} onChange={onSetFilter} />
      <GroupBar value={groupStack} onChange={onSetGroup} />
    </div>
  );
};

export default HostListToolbar;
