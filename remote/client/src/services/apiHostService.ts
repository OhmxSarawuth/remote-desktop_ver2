
// tagService.ts

export interface Host {
  host_id: number;
  host_name: string;
}

export interface HostInfo {
  host_id: number;
  ip: string;
  description: string;
}



export async function fetchHosts(): Promise<Host[]> {
  const res = await fetch("http://localhost:3001/api/hosts");
  console.log("fetching hosts from API : " + res.json)
  if (!res.ok) throw new Error("Failed to fetch hosts");
  return res.json();
}

export async function fetchHostInfo(host_id: number): Promise<HostInfo> {
  const res = await fetch(`http://localhost:3001/api/hostinfo/${host_id}`);
  if (!res.ok) throw new Error("Failed to fetch host info");
  return res.json();
}


export interface HostTag {
  tag_id: number;
  host_id: number;
  tag_depend: number;
  tag_type: string;
  tag_data: string;
}

export async function fetchTags(host_id?: number): Promise<HostTag[]> {
  const url = host_id ? `http://localhost:3001/api/tags?host_id=${host_id}` : "http://localhost:3001/api/tags";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
}
