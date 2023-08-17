import { camelizeKeys } from 'humps';
import { adaptTerrain, adaptListRoute, adaptRoute } from './adapters';
import type * as DTO from './types';

type QueryOptions = {
  qs?: Record<string, string>;
  headers?: Record<string, string>;
};

const { VITE_SUPABASE_URL, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string, options?: QueryOptions) => {
  const url = new URL(endpoint, VITE_SUPABASE_URL);
  url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
  Object.entries(options?.qs || {}).forEach(([k, v]) => url.searchParams.set(k, v));
  const response = await fetch(url, { headers: options?.headers });
  if (!response.ok) throw new Error(`${response.status} | ${response.statusText}`);
  const data = await response.json();
  return camelizeKeys(data) as T;
};

export const getTerrains = async () => {
  const terrains = await query<DTO.Terrain[]>('terrains');
  return terrains.map(adaptTerrain);
};

export const getRoutes = async () => {
  const fields = ['code', 'name:name_ca', 'grade', 'duration', 'distance', 'vertical_drop', 'orientation', 'circular', 'created_at', 'updated_at'];
  const routes = await query<DTO.ListRoute[]>('routes', { qs: { select: fields.join(',') } });
  return routes.map(adaptListRoute);
};

export const getRoute = async (code: string) => {
  const select = ['name:name_ca', 'description:description_ca', '*'].join(',');
  const loadRoute = query<DTO.Route>('routes', {
    headers: { Accept: 'application/vnd.pgrst.object+json' }, // Return row as a single object
    qs: { select, code: `eq.${code}` },
  });
  const loadWaypoints = query<DTO.Waypoint[]>('waypoints', {
    qs: { select, route_codes: `cs.{${code}}` },
  });
  const [route, waypoints] = await Promise.all([loadRoute, loadWaypoints]);
  return adaptRoute(route, waypoints);
};
