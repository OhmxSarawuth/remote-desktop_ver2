
import React, { useState, useEffect } from "react";
//  component
import HostListToolbar from "../components/HostListToolbar";
import HostListItems from "../components/HostListItems";

// tools data components
import { FilterStackItem } from "../components/HostListToolbar/FilterSelect";
import { Search } from "../components/HostListToolbar/SearchInput";
import { GroupStackItem } from "../components/HostListToolbar/GroupBar";
// host data
import {Host, HostInfo , HostTag} from "../services/apiHostService"

export interface HostItem {
  host: Host;
  info: HostInfo | null;
  tags: HostTag[];
}
interface HostListProps {
  username: string | null;
  token: string | null;
}


const HostList: React.FC<HostListProps> = ({ username, token }) => {



  const [allHosts, setAllHosts] = useState<HostItem[]>([]);
  const [hosts, setHosts] = useState<HostItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterStack, setFilterStack] = useState<FilterStackItem[]>([]);
  const [groupStack, setGroupStack] = useState<GroupStackItem[]>([]);
  const [search, setSearch] = useState<Search>({ search: "" });

  useEffect(() => {
    async function load() {
      try {
        const { fetchHosts, fetchHostInfo, fetchTags } = await import("../services/apiHostService");
        const hostsRaw = await fetchHosts();
        const all: HostItem[] = [];
        for (const host of hostsRaw) {
          const [info, tags] = await Promise.all([
            fetchHostInfo(host.host_id),
            fetchTags(host.host_id),
          ]);
          all.push({ host, info, tags });
        }
        setAllHosts(all);
        setHosts(all);
      } catch (e: any) {
        setError(e.message);
      }
    }
    load();
  }, []);

  useEffect(() => {
    setHosts(hostfilterAndSearch());
  }, [allHosts, filterStack, groupStack, search]);

  const setGroupData = (data: GroupStackItem[]) => {
    setGroupStack(data);
  };
  const setFilterData = (data: FilterStackItem[]) => {
    setFilterStack(data);
  };
  const setSearchData = (data: Search) => {
    setSearch(data);
  };

  function hostfilterAndSearch(): HostItem[] {
    let filtered = allHosts;
    // Filter by groupStack (if any)
    if (groupStack.length > 0) {
      filtered = filtered.filter(hostItem =>
        groupStack.every(group =>
          hostItem.tags.some(tag => tag.tag_type === group.tagType)
        )
      );
    }
    // Filter by filterStack (if any)
    if (filterStack.length > 0) {
      filtered = filtered.filter(hostItem =>
        filterStack.every(filter =>
          hostItem.tags.some(tag => tag.tag_type === filter.tagType && (!filter.tagInfo || tag.tag_data.includes(filter.tagInfo)))
        )
      );
    }
    // Filter by search
    if (search?.search) {
      filtered = filtered.filter(hostItem =>
        hostItem.host.host_name.toLowerCase().includes(search.search.toLowerCase())
      );
    }
    return filtered;
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Tools</h2>
      <HostListToolbar
        groupStack={groupStack}
        onSetGroup={setGroupData}
        filterStack={filterStack}
        onSetFilter={setFilterData}
        search={search}
        onSearchChange={setSearchData}
      />
      <HostListItems
        hosts={hosts}
        token={token}
        groupStack={groupStack}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default HostList;
