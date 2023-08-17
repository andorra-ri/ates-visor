import { camelizeKeys } from 'humps';
import { adaptTerrain, adaptListRoute, adaptRoute, adaptWaypoint } from './adapters';
import type { Terrain, ListRoute, Route, Waypoint } from './types';

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
  const terrains = await query<Terrain[]>('terrains');
  return terrains.map(adaptTerrain);
};

export const getRoutes = async () => {
  const fields = ['code', 'name:name_ca', 'grade', 'duration', 'distance', 'vertical_drop', 'orientation', 'circular', 'created_at', 'updated_at'];
  const routes = await query<ListRoute[]>('routes', { qs: { select: fields.join(',') } });
  return routes.map(adaptListRoute);
};

export const getRoute = async (code: string) => {
  const fields = ['name:name_ca', 'description:description_ca', '*'];
  const route = await query<Route>('routes', {
    headers: { Accept: 'application/vnd.pgrst.object+json' },
    qs: {
      select: fields.join(','),
      code: `eq.${code}`,
    },
  });
  return adaptRoute(route);
};

export const getWaypoints = async (routeCode: string) => {
  const fields = ['name:name_ca', 'description:description_ca', '*'];
  const waypoints = await query<Waypoint[]>('waypoints', {
    qs: {
      select: fields.join(','),
      route_codes: `cs.{${routeCode}}`,
    },
  });
  return waypoints.map(adaptWaypoint);
};
