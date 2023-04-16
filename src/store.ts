import { reactive } from 'vue';
import { supabase } from '/@/services';
import type { Terrain, Route } from '/@/types';

type State = {
  terrain: Terrain[];
  routes: Route[];
};

const state = reactive<State>({
  terrain: [],
  routes: [],
});

const loadTerrain = async () => {
  state.terrain = await supabase.getTerrains();
};

const loadRoutes = async () => {
  state.routes = await supabase.getRoutes();
};

export default {
  state,
  loadTerrain,
  loadRoutes,
};
