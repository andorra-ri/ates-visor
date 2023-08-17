import { unref } from 'vue';
import { useControls, type Map, type ControlOptions } from 'mapbox-composition';
import LegendControl, { type LayerOptions as LegendLayerOptions } from 'mapboxgl-legend';
import { Deferred } from '/@/utils';
import type { MaybeRef } from '/@/types';

const LEGEND_POSITION = 'bottom-right';
const LEGEND_NAME = 'legend';

const legend = new Deferred<LegendControl>();

export type LegendOptions = ControlOptions<typeof LegendControl>;
export type { LegendLayerOptions };

export default (map: Deferred<Map>) => {
  const createLegend = async (options?: MaybeRef<LegendOptions>) => {
    const _map = await map.promise;
    const { addControl } = useControls(_map);
    const { position = LEGEND_POSITION, ...rest } = unref(options) || {};
    const control = new LegendControl(rest);
    addControl(LEGEND_NAME, position, control);
    legend.resolve(control);
  };

  const removeLegend = async () => {
    const _map = await map.promise;
    const { removeControl } = useControls(_map);
    removeControl(LEGEND_NAME);
    legend.reset();
  };

  const addLegendLayers = async (layers: Record<string, LegendLayerOptions> | string[]) => {
    const _legend = await legend.promise;
    _legend.addLayers(layers);
  };

  const removeLegendLayers = async (layers: Record<string, LegendLayerOptions> | string[]) => {
    const _legend = await legend.promise;
    const names = Array.isArray(layers) ? layers : Object.keys(layers);
    _legend.removeLayers(names);
  };

  return { createLegend, removeLegend, addLegendLayers, removeLegendLayers };
};
