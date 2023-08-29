import type * as DTO from './models';
import type { Terrain, Trail, Route, ListRoute, Waypoint } from '/@/types';

export const adaptTerrain = (terrain: DTO.Terrain): Terrain => terrain;

export const adaptListRoute = (route: DTO.ListRoute): ListRoute => {
  const { code, name, grade, duration, distance } = route;
  return { code, name, grade, duration, distance };
};

export const adaptTrail = (trail: DTO.Trail): Trail => {
  const { main, down, geometry } = trail;
  return { main, down, geometry };
};

export const adaptWaypoint = (waypoint: DTO.Waypoint): Waypoint => {
  const { routeCodes, ...rest } = waypoint;
  return rest;
};

export const adaptRoute = (route: DTO.Route, wp?: DTO.Waypoint[]): Route => {
  const { createdAt, updatedAt, ...rest } = route;
  const trails = route.trails.map(adaptTrail);
  const waypoints = wp?.map(adaptWaypoint) || [];
  return { ...rest, trails, waypoints };
};
