import type { Point, LineString, Polygon, MultiPolygon } from '@turf/helpers';

export type Grade = 'SIMPLE' | 'CHALLENGING' | 'COMPLEX';

export type Orientation = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO';

export type Terrain = {
  id: string;
  grade: Grade;
  geometry: Polygon | MultiPolygon;
  updatedAt: string;
  createdAt: string;
};

export type Trail = {
  id: number;
  main: boolean;
  down: boolean;
  duration: number;
  routeCode: string;
  geometry: LineString;
  createdAt: string;
  updatedAt: string;
};

export type Route = {
  code: string;
  name: string;
  description: string;
  grade: Grade;
  duration: number;
  distance: number;
  verticalDrop: number;
  orientation: Orientation[];
  circular: boolean;
  trails: Trail[];
  createdAt: string;
  updatedAt: string;
};

export type ListRoute = Omit<Route, 'description' | 'trails'>;

export type Waypoint = {
  id: number;
  kind: 'DECISION' | 'ALERT';
  name: string;
  description: string;
  routeCodes: string[];
  geometry: Point;
};
