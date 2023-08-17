import { reactive } from 'vue';
import { supabase } from '/@/services';
import type { Terrain, ListRoute, Route } from '/@/types';

type State = {
  terrain: Terrain[];
  routes: ListRoute[];
  route: Route | undefined;
};

const state = reactive<State>({
  terrain: [],
  routes: [],
  route: undefined,
});

const loadTerrain = async () => {
  state.terrain = await supabase.getTerrains();
};

const loadRoutes = async () => {
  state.routes = await supabase.getRoutes();
};

const selectRoute = async (routeCode: string | undefined) => {
  state.route = undefined;
  if (!routeCode) return;
  state.route = await supabase.getRoute(routeCode);
};

export default {
  state,
  loadTerrain,
  loadRoutes,
  selectRoute,
};
