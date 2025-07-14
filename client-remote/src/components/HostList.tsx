import React, { useEffect,useState } from "react";
import {Host} from "../models"
import HostCard from "./HostCard";


// Mock host data
const hosts = [
  { id: 1, name: "Server A", tags: ["linux", "production"] },
  { id: 2, name: "Server B", tags: ["windows", "test"] },
  { id: 3, name: "Server C", tags: ["linux", "test"] },
  { id: 4, name: "Server D", tags: ["windows", "production"] },
];

// Get all unique tags
const allTags = Array.from(new Set(hosts.flatMap(h => h.tags)));

const HostList: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [hosts, setHosts] = useState<Host[]>([]);


useEffect(() => {
    fetch("/tempHost.json")
      .then((res) => res.json())
      .then((data: Host[]) => setHosts(data))
      .catch((err) => console.error("Error loading host data:", err));
  }, []);
const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("dataSource");
    window.location.href = "/login"; // หรือเส้นทางที่คุณใช้
  };


  const filteredHosts =
    selectedTag === "all"
      ? hosts
      : hosts.filter(HOSTS => HOSTS.tags.includes(selectedTag));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Host List</h2><button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by group:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          <option value="all">All</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      
<ul>
        {filteredHosts.map((host) => (
    <HostCard key={host.id} host={host}/>
))}
      </ul>

    </div>
  );
};

export default HostList;