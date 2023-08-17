import { useAsync, type Map } from 'mapbox-composition';
import { Deferred, getBounds, type GeoJSONObject, type Featureable } from '/@/utils';

type FitOptions = {
  bearing?: number;
  padding?: number;
  pitch?: number;
  speed?: number;
};

export default (map: Deferred<Map>) => {
  const fitTo = async (
    features: GeoJSONObject | Featureable[],
    options?: FitOptions,
  ) => {
    const _map = await map.promise;
    const { fitBounds } = useAsync(_map);
    const bounds = getBounds(features);
    fitBounds(bounds, options);
  };

  return { fitTo };
};
