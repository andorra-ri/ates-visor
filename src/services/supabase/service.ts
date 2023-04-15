import { camelizeKeys } from 'humps';
import { adaptTerrain, adaptRoute } from './adapters';
import type { Terrain, Route } from './types';

const { VITE_SUPABASE_URL, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string) => {
  try {
    const url = new URL(`${VITE_SUPABASE_URL}/rest/v1/${endpoint}`);
    url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
    const response = await fetch(url);
    const data = await response.json();
    return camelizeKeys(data) as T;
  } catch {
    throw new Error('ERROR_SUPABASE_LOAD');
  }
};

export const getTerrains = async () => {
  const terrains = await query<Terrain[]>('/terrains');
  return terrains.map(adaptTerrain);
};

export const getRoutes = async () => {
  const routes = await query<Route[]>('/routes');
  return routes.map(adaptRoute);
};
