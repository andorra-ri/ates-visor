import { createMap as _createMap, type Map, type MapOptions } from 'mapbox-composition';
import useLegend from './legend';
import useLayer from './layer';
import usePopup from './popup';
import useAsync from './async';
import { Deferred, geo } from './utils';

const { VITE_MAPBOX_TOKEN } = import.meta.env;

const map = new Deferred<Map>();

export const createMap = async (container: string | HTMLElement, options: MapOptions) => {
  const _map = await _createMap(container, {
    accessToken: VITE_MAPBOX_TOKEN,
    ...options,
  });
  map.resolve(_map);
};

export const useMap = () => {
  const legend = useLegend(map);
  const layer = useLayer(map);
  const popup = usePopup(map);
  const async = useAsync(map);

  return { ...legend, ...layer, ...popup, ...async, ...geo };
};
