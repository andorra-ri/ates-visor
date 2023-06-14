import { useMap as useMapbox, useControls } from 'mapbox-composition';
import useLegend from './legend';
import useLayer from './layer';
import usePopup from './popup';
import useAsync from './async';
import useImages from './images';
import { Deferred } from '/@/utils';
import type { Map, MapOptions } from './types';

const { VITE_MAPBOX_TOKEN } = import.meta.env;

const map = new Deferred<Map>();

export const createMap = async (container: string | HTMLElement, options: MapOptions) => {
  const { controls = {}, ...mapOptions } = options;
  const _map = await useMapbox(container, {
    accessToken: VITE_MAPBOX_TOKEN,
    ...mapOptions,
  });

  const addControl = useControls(_map);
  Object.entries(controls).forEach(([name, control]) => {
    // eslint-disable-next-line
    // @ts-ignore 
    addControl[`add${name}`](control);
  });

  map.resolve(_map);
};

export const useMap = () => {
  const legend = useLegend(map);
  const layer = useLayer(map);
  const popup = usePopup(map);
  const async = useAsync(map);
  const images = useImages(map);

  return { ...legend, ...layer, ...popup, ...async, ...images };
};
