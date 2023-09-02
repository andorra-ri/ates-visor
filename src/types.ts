import type { Ref } from 'vue';
import type { Point, LineString, Polygon, MultiPolygon } from '@turf/helpers';

/* UTILITY TYPES */
export type MaybeRef<T> = T | Ref<T>;
export type MaybeArray<T> = T | T[];

/* DOMAIN TYPES */

export type Grade = 'SIMPLE' | 'CHALLENGING' | 'COMPLEX';

export type Orientation = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO';

export type Terrain = {
  id: string;
  grade: Grade;
  geometry: Polygon | MultiPolygon;
};

export type Trail = {
  main: boolean;
  down: boolean;
  geometry: LineString;
};

export type Waypoint = {
  id: number;
  kind: 'DECISION' | 'ALERT';
  name: string;
  description: string;
  image: string;
  geometry: Point;
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
  waypoints: Waypoint[];
};

export type ListRoute = Pick<Route, 'code' | 'name' | 'grade' | 'duration' | 'distance'>;
