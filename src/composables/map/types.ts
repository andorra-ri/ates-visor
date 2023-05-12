import type {
  Map,
  GeoJSONLayerOptions,
  PopupOptions,
  MapOptions,
  MapMouseEvent,
} from 'mapbox-composition';
import type { LayerOptions as LegendLayerOptions } from 'mapboxgl-legend';
import type { MaybeRef } from '/@/types';

export type { Map, MapOptions, PopupOptions, MapMouseEvent };

export type LayerOptions = MaybeRef<{
  images?: Record<string, string>;
  legend?: Record<string, LegendLayerOptions>;
} & GeoJSONLayerOptions>;
