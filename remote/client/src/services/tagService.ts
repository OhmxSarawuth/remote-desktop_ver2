// Fetch tag infos for a given tag type
export async function fetchTagInfos(tagType: string): Promise<string[]> {
  const res = await fetch(`http://localhost:3001/api/tagtemplate/info?type=${encodeURIComponent(tagType)}`);
  if (!res.ok) throw new Error("Failed to fetch tag infos");
  return res.json();
}


export interface HostTag {
  tag_id: number;
  host_id: number;
  tag_depend: number;
  tag_type: string;
  tag_data: string[];
}
export interface TagTemplate{
  type: string;
  infos:string[];
}

export async function fetchTags(host_id?: number): Promise<HostTag[]> {
  const url = host_id ? `/api/tags?host_id=${host_id}` : "/api/tags";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
}
// tagService.ts

// Fetch all tag types from /api/tagtemplate
export async function fetchTagTemplat(): Promise<string[]> {
  const res = await fetch("http://localhost:3001/api/tagtemplate");
  if (!res.ok) throw new Error("Failed to fetch tag types");
  return res.json();
}

