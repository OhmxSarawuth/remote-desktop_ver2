// Dummy data for demonstration. Replace with your DB or config as needed.
const tagTemplates = [
  { type: "os", infos: ["linux", "window"] },
  { type: "Infrastructure", infos: ["aws", "azure", "gcp"] },
  { type: "env", infos: ["prod", "dev", "test"] },
  { type: "user", infos: []},
  { type: "password", infos:[]}
];

export async function getTagTypesService(): Promise<string[]> {
  return tagTemplates.map(t => t.type);
}

export async function getTagInfosService(type: string): Promise<string[]> {
  const found = tagTemplates.find(t => t.type === type);
  return found ? found.infos : [];
}
