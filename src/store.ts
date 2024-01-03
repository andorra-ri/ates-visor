import { reactive, toRefs } from 'vue';
import { supabase, meteo } from '/@/services';
import type { Terrain, ListRoute, Route } from '/@/types';

type State = {
  terrain: Terrain[];
  routes: ListRoute[];
  route: Route | undefined;
  avalancheRisk: number;
};

const state = reactive<State>({
  terrain: [],
  routes: [],
  route: undefined,
  avalancheRisk: 0,
});

const loadAvalancheRisk = async () => {
  state.avalancheRisk = await meteo.getAvalancheRisk();
};

const loadTerrain = async () => {
  state.terrain = await supabase.getTerrains();
};

const loadRoutes = async () => {
  state.routes = await supabase.getRoutes();
};

const selectRoute = async (route: ListRoute | undefined) => {
  state.route = route ? await supabase.getRoute(route.code) : undefined;
};

export default {
  ...toRefs(state),
  loadAvalancheRisk,
  loadTerrain,
  loadRoutes,
  selectRoute,
};
