import { camelizeKeys } from 'humps';
import { adaptTerrain, adaptListRoute, adaptRoute } from './adapters';
import { Array, Terrain, ListRoute, Route, Waypoint } from './models';
import type * as DTO from './models';
import { getLocaleField } from '/@/utils';

type QueryOptions = {
  qs?: Record<string, string>;
  headers?: Record<string, string>;
};

const { VITE_SUPABASE_ID, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string, options?: QueryOptions) => {
  const url = new URL(endpoint, `https://${VITE_SUPABASE_ID}.supabase.co/rest/v1/`);
  url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
  Object.entries(options?.qs || {}).forEach(([k, v]) => url.searchParams.set(k, v));
  const response = await fetch(url, { headers: options?.headers });
  if (!response.ok) throw new Error(`${response.status} | ${response.statusText}`);
  const data = await response.json();
  return camelizeKeys(data) as T;
};

export const getTerrains = async () => {
  const terrains = await query<DTO.Terrain[]>('terrains');
  return Array(Terrain)
    .parse(terrains)
    .map(adaptTerrain);
};

export const getRoutes = async () => {
  const fields = [
    'code',
    `name:${getLocaleField('name')}`,
    // 'name_ca',
    // 'name_es',
    // 'name_fr',
    // 'name_en',
    `description:${getLocaleField('description')}`,
    // 'description_ca',
    // 'description_es',
    // 'description_fr',
    // 'description_en',
    `departure:${getLocaleField('departure')}`,
    // 'departure_ca',
    // 'departure_es',
    // 'departure_fr',
    // 'departure_en',
    `arrival:${getLocaleField('arrival')}`,
    // 'arrival_ca',
    // 'arrival_es',
    // 'arrival_fr',
    // 'arrival_en',
    'grade',
    'duration',
    'distance',
    'elevation',
    'orientation',
    'circular',
    'zone',
    'created_at',
    'updated_at',
    'trails',
  ];
  const routes = await query<DTO.ListRoute[]>('routes_testing', { qs: { select: fields.join(',') } });
  return Array(ListRoute)
    .parse(routes)
    .map(adaptListRoute);
};

export const getRoute = async (code: string) => {
  const fetchRoute = async () => {
    const select = [
      `name:${getLocaleField('name')}`,
      `description:${getLocaleField('description')}`,
      `arrival:${getLocaleField('arrival')}`,
      `departure:${getLocaleField('departure')}`,
      '*',
    ].join(',');
    const route = await query<DTO.Route>('routes_testing', {
      headers: { Accept: 'application/vnd.pgrst.object+json' }, // Return row as a single object
      qs: { select, code: `eq.${code}` },
    });
    return Route.parse(route);
  };

  const fetchWaypoints = async () => {
    const select = [`name:${getLocaleField('name')}`, `description:${getLocaleField('description')}`, '*'].join(',');
    const waypoints = await query<DTO.Waypoint[]>('waypoints_testing', {
      qs: { select, route_code: `eq.${code}` },
    });
    return Array(Waypoint)
      .parse(waypoints)
      .sort((a, b) => a.order - b.order);
  };

  const [route, waypoints] = await Promise.all([fetchRoute(), fetchWaypoints()]);
  return adaptRoute(route, waypoints);
};
