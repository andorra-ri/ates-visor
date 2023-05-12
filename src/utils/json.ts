import { feature, featureCollection, type Geometry, type GeoJSONObject } from '@turf/helpers';
import bbox from '@turf/bbox';

export type { GeoJSONObject };

export type Featureable = {
  geometry: Geometry,
  properties?: object,
};

export const toFeatureCollection = (items: Featureable[]) => {
  const features = items.map(item => {
    const { geometry, properties, ...rest } = item;
    return feature(geometry, properties ?? rest);
  });
  return featureCollection(features);
};

export const getBounds = (item: GeoJSONObject | Featureable[]) => {
  const geojson = Array.isArray(item) ? toFeatureCollection(item) : item;
  return bbox(geojson);
};
