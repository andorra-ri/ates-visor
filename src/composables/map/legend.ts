import { useControls } from 'mapbox-composition';
import LegendControl, { type LegendControlOptions, type LayerOptions } from 'mapboxgl-legend';
import { Deferred } from '/@/utils';
import type { Map } from './types';

type AddLayer = Record<string, boolean | LayerOptions>;

const LEGEND_NAME = 'LEGEND';
const legend = new Deferred<LegendControl>();

export default (map: Deferred<Map>) => {
  const createLegend = async (options: LegendControlOptions) => {
    const resolved = await map.promise;
    const { addControl } = useControls(resolved);
    const control = new LegendControl(options);
    addControl(LEGEND_NAME, 'bottom-right', control);
    legend.resolve(control);
  };

  const removeLegend = async () => {
    const resolved = await map.promise;
    const { removeControl } = useControls(resolved);
    removeControl(LEGEND_NAME);
    legend.reset();
  };

  const addLegendLayers = async (layers: AddLayer) => {
    const control = await legend.promise;
    control.addLayers(layers);
  };

  const removeLegendLayers = async (layerIds: string[]) => {
    const control = await legend.promise;
    control.removeLayers(layerIds);
  };

  return { createLegend, removeLegend, addLegendLayers, removeLegendLayers };
};
