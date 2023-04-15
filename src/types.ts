import type { Ref, DeepReadonly } from 'vue';
import type { Point, LineString, Polygon, MultiPolygon } from '@turf/helpers';

/* UTILITY TYPES */
export type MaybeRef<T> = T | Ref<T>;
export type MaybeReadonly<T> = T | DeepReadonly<T>;

/* DOMAIN TYPES */

export type Grade = 'SIMPLE' | 'CHALLENGING' | 'COMPLEX';

export type Orientation = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO';

export type Terrain = {
  id: string;
  grade: Grade;
  geometry: Polygon | MultiPolygon;
};

export type Route = {
  name: string;
  code: string;
  grade: Grade;
  duration: number;
  distance: number;
  verticalDrop: number;
  orientation: Orientation[];
  circular: boolean;
};
