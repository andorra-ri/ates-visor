import { reactive } from 'vue';
import { supabase } from '/@/services';
import type { Terrain, ListRoute, Route, Waypoint } from '/@/types';

type State = {
  terrain: Terrain[];
  routes: ListRoute[];
  route: Route | undefined;
  waypoints: Waypoint[];
};

const state = reactive<State>({
  terrain: [],
  routes: [],
  route: undefined,
  waypoints: [],
});

const loadTerrain = async () => {
  state.terrain = await supabase.getTerrains();
};

const loadRoutes = async () => {
  state.routes = await supabase.getRoutes();
};

const selectRoute = async (routeCode: string | undefined) => {
  state.route = undefined;
  state.waypoints = [];
  if (!routeCode) return;
  supabase.getRoute(routeCode).then(route => { state.route = route; });
  supabase.getWaypoints(routeCode).then(waypoints => { state.waypoints = waypoints; });
};

export default {
  state,
  loadTerrain,
  loadRoutes,
  selectRoute,
};
