import type {
  Terrain as TerrainDTO,
  Trail as TrailDTO,
  Route as RouteDTO,
  ListRoute as ListRouteDTO,
  Waypoint as WaypointDTO,
} from './types';
import type { Terrain, Trail, Route, ListRoute, Waypoint } from '/@/types';

export const adaptTerrain = (terrain: TerrainDTO): Terrain => terrain;

export const adaptListRoute = (route: ListRouteDTO): ListRoute => {
  const { code, name, grade, duration, distance } = route;
  return { code, name, grade, duration, distance };
};

export const adaptTrail = (trail: TrailDTO): Trail => {
  const { main, down, geometry } = trail;
  return { main, down, geometry };
};

export const adaptRoute = (route: RouteDTO): Route => {
  const { createdAt, updatedAt, ...rest } = route;
  const trails = route.trails.map(adaptTrail);
  return { ...rest, trails };
};

export const adaptWaypoint = (waypoint: WaypointDTO): Waypoint => {
  const { routeCodes, ...rest } = waypoint;
  return rest;
};
