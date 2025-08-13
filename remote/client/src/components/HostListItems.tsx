


import { HostItem } from "../pages/HostList";
import { GroupStackItem } from "./HostListToolbar/GroupBar";
import HostItemComponent from "./HostListItem/HostItem";

interface HostListItemsProps {
  hosts: HostItem[];
  groupStack: GroupStackItem[];
  token: string | null;
}

const HostListItems: React.FC<HostListItemsProps> = ({ hosts, groupStack, token }) => {
  return (
    <div>
      <ul>
        {hosts.map(hd => (
          <HostItemComponent key={hd.host.host_id} item={hd} />
        ))}
      </ul>
    </div>
  );
};

export default HostListItems;



