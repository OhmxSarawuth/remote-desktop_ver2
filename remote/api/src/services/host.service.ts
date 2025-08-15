
// Mock data
const hosts = [
  { host_id: 1, host_name: "name1" },
  { host_id: 2, host_name: "name2" },
  { host_id: 3, host_name: "name3" },
];

const hostInfos = [
  { host_id: 1, ip: "192.168.1.10", description: "Host 1 info" },
  { host_id: 2, ip: "192.168.1.11", description: "Host 2 info" },
  { host_id: 3, ip: "172.23.81.8", description: "Host 3 info" },
];


const tags = [
    { tag_id: 1, host_id: 1, tag_depend: 0, tag_type: "os", tag_data: "window"},
    {tag_id:2, host_id:1,tag_depend:0,tag_type:"os",tag_data:"linux"},
    {tag_id:3, host_id:2, tag_depend:0, tag_type:"os", tag_data:"window"},
    {tag_id:4, host_id:2, tag_depend:0, tag_type:"env", tag_data:"dev"},
    {tag_id:5, host_id:1, tag_depend:0, tag_type: "env", tag_data: "prod"},
    {tag_id:6, host_id:1, tag_depend:0, tag_type: "env", tag_data: "dev"},
    {tag_id:7, host_id:1, tag_depend:1, tag_type: "user", tag_data: "administrator"},
    {tag_id:8, host_id:1, tag_depend:7, tag_type: "password", tag_data:"password123"},
    {tag_id:9, host_id:1, tag_depend:1, tag_type: "user", tag_data: "ohmwindow"},
    {tag_id:10, host_id:1, tag_depend:9, tag_type: "password", tag_data:"ohmpass123"},
    {tag_id:11, host_id:1, tag_depend:2, tag_type: "user", tag_data:"ohmlinux"},
    {tag_id:12, host_id:1, tag_depend:11, tag_type:"password",tag_data:"linuxpass123"},
    {tag_id:13,host_id:2,tag_depend:3, tag_type:"user" , tag_data:"secoundwindow"},
    {tag_id:14,host_id:2,tag_depend:13, tag_type:"password", tag_data:"secoun123"},
    {tag_id:15,host_id:3,tag_depend:0,tag_type:"os",tag_data:"linux"},
    {tag_id:16,host_id:3,tag_depend:15,tag_type:"env",tag_data:"dev"},
    {tag_id:17,host_id:3,tag_depend:15,tag_type:"user",tag_data:"root"},
    {tag_id:18,host_id:3,tag_depend:17,tag_type:"password",tag_data:"password"}

]

// API functions
export async function getHosts() {
  return hosts;
}

export async function getHostInfo(host_id: number) {
  return hostInfos[host_id] || {};
}

export async function getTags(host_id?: number) {
  if (host_id) {
    return tags.filter(tag => tag.host_id === host_id);
  }
  return tags;
}
