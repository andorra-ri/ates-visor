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
  // name_ca: string;
  // name_es: string;
  // name_fr: string;
  // name_en: string;
  description: string;
  // description_ca: string;
  // description_es: string;
  // description_fr: string;
  // description_en: string;
  image: string;
  geometry: Point;
};

export type Route = {
  code: string;
  name: string;
  // name_ca: string;
  // name_es: string;
  // name_fr: string;
  // name_en: string;
  description: string;
  // description_ca: string;
  // description_es: string;
  // description_fr: string;
  // description_en: string;
  arrival: string;
  // arrival_ca: string;
  // arrival_es: string;
  // arrival_fr: string;
  // arrival_en: string;
  departure: string;
  // departure_ca: string;
  // departure_es: string;
  // departure_fr: string;
  // departure_en: string;
  zone: string;
  grade: Grade;
  duration: number;
  distance: number;
  elevation: number;
  orientation: Orientation[];
  circular: boolean;
  trails: Trail[];
  waypoints: Waypoint[];
};

export type ListRoute = Pick<Route, 'code' | 'name' | 'grade' | 'duration' | 'distance' | 'elevation' | 'orientation' | 'zone' | 'trails'>;
