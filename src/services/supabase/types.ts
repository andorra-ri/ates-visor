import type { Polygon, MultiPolygon } from '@turf/helpers';

export type Grade = 'SIMPLE' | 'CHALLENGING' | 'COMPLEX';

export type Orientation = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO';

export type Terrain = {
  id: string;
  grade: Grade;
  geometry: Polygon | MultiPolygon;
  updatedAt: string;
  createdAt: string;
};

export type Route = {
  code: string;
  name: string;
  grade: Grade;
  verticalDrop: number;
  orientation: Orientation[];
  circular: boolean;
  duration: number;
  distance: number;
  createdAt: string;
  updatedAt: string;
  _link: string;
};
