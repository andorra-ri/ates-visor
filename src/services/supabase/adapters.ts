import type { Terrain as STerrain, Route as SRoute } from './types';
import type { Terrain, Route } from '/@/types';

export const adaptTerrain = (terrain: STerrain): Terrain => terrain;

export const adaptRoute = (route: SRoute): Route => route;
