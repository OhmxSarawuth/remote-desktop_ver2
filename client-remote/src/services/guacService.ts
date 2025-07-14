// src/services/guacService.ts
import axios from 'axios';

export const getGuacamoleSessionUrl = async (hostId: number): Promise<string> => {
  const response = await axios.post('http://localhost:3000/api/guac/session', { hostId });
  return response.data.url;
};
