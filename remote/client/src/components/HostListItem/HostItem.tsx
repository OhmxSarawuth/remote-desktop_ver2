import React, { useState, useMemo, useEffect } from "react";
import { HostItem as HostItemType } from "../../pages/HostList";

interface HostItemProps {
  item: HostItemType;
  token: string | null;
}

const HostItem: React.FC<HostItemProps> = ({ item,  token }) => {
  // Filter OS tags
  const osTags = useMemo(() => item.tags.filter(t => t.tag_type === "os"), [item.tags]);
  const [selectedOsTagId, setSelectedOsTagId] = useState<number | null>(osTags[0]?.tag_id ?? null);

  // Filter user tags based on selected OS
  const userTags = useMemo(
    () => item.tags.filter(t => t.tag_type === "user" && t.tag_depend === selectedOsTagId),
    [item.tags, selectedOsTagId]
  );
  const [selectedUserTagId, setSelectedUserTagId] = useState<number | null>(userTags[0]?.tag_id ?? null);

  // Update selected user when OS changes
  useEffect(() => {
    if (!userTags.some(u => u.tag_id === selectedUserTagId)) {
      setSelectedUserTagId(userTags[0]?.tag_id ?? null);
    }
  }, [userTags, selectedUserTagId]);

  // Find password based on selected user
  const passwordTag = useMemo(
    () => item.tags.find(t => t.tag_type === "password" && t.tag_depend === selectedUserTagId),
    [item.tags, selectedUserTagId]
  );

  // Other tags (for info)
  const displayTags = useMemo(
    () => item.tags.filter(t => !["os", "user", "password"].includes(t.tag_type)),
    [item.tags]
  );

  // Connect button action
  const handleConnect = () => {
    const ip = item.info?.ip || "";
    const os = osTags.find(o => o.tag_id === selectedOsTagId)?.tag_data || "";
    const user = userTags.find(u => u.tag_id === selectedUserTagId)?.tag_data || "";
    const password = passwordTag?.tag_data || "";
    console.log("Selected Host Info:", { token,ip, os, user, password });
  };

  return (
    <li className="mb-2 border rounded p-2 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <div className="font-semibold">{item.host.host_name}</div>
        {item.info && <div className="text-xs text-gray-500">IP: {item.info.ip}</div>}

        {/* OS Dropdown */}
        {osTags.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium">OS:</span>
            <select
              className="border rounded px-2 py-1 text-xs"
              value={selectedOsTagId ?? ""}
              onChange={e => setSelectedOsTagId(Number(e.target.value))}
            >
              {osTags.map(os => (
                <option key={os.tag_id} value={os.tag_id}>{os.tag_data}</option>
              ))}
            </select>
          </div>
        )}

        {/* User Dropdown */}
        {userTags.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium">User:</span>
            <select
              className="border rounded px-2 py-1 text-xs"
              value={selectedUserTagId ?? ""}
              onChange={e => setSelectedUserTagId(Number(e.target.value))}
            >
              {userTags.map(user => (
                <option key={user.tag_id} value={user.tag_id}>{user.tag_data}</option>
              ))}
            </select>
          </div>
        )}

        {/* Password Display */}
        {passwordTag && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium">Password:</span>
            <span className="text-xs">{passwordTag.tag_data}</span>
          </div>
        )}

        {/* Other tags */}
        {displayTags.length > 0 && (
          <div className="mt-2 text-xs">
            Tags: {displayTags.map(t => `[${t.tag_type}] ${Array.isArray(t.tag_data) ? t.tag_data.join(",") : t.tag_data}`).join(" | ")}
          </div>
        )}
      </div>

      {/* Connect Button */}
      <div className="mt-2 md:mt-0 md:ml-4 flex items-center justify-end">
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          onClick={handleConnect}
        >
          Connect
        </button>
      </div>
    </li>
  );
};

export default HostItem;
