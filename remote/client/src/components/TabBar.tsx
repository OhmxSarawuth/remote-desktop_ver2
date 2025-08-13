import React from "react";

const TABS = [
  { key: "hostlist", label: "Host List" },
  { key: "starcat", label: "StarCat" },
  { key: "searchbranch", label: "Search Branch" }
];

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      {TABS.map(tab => (
        <button
          key={tab.key}
          className={`px-4 py-2 focus:outline-none ${activeTab === tab.key ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
