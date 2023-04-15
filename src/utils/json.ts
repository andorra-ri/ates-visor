import { feature, featureCollection, type Geometry } from '@turf/helpers';
import type { MaybeReadonly } from '/@/types';

type Featureable = {
  geometry: Geometry,
  properties?: object,
};

export const toFeatureCollection = (items: MaybeReadonly<Featureable[]>) => {
  const features = items.map(item => {
    const { geometry, properties, ...rest } = item;
    return feature(geometry, properties ?? rest);
  });
  return featureCollection(features);
};
