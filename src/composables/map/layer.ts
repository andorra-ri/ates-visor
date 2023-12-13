import { ref, unref, isRef, watch, effectScope, onMounted, onUnmounted, type EffectScope } from 'vue';
import { useGeoJSON, useImages, type Map, type GeoJSONLayerOptions } from 'mapbox-composition';
import useLegend, { type LegendLayerOptions } from './legend';
import type { MaybeRef } from '/@/types';
import type { Deferred } from './utils';

export type LayerOptions = MaybeRef<{
  images?: Record<string, string>;
  legend?: Record<string, LegendLayerOptions>;
} & GeoJSONLayerOptions>;

export default (map: Deferred<Map>) => {
  const { addLegendLayers, removeLegendLayers } = useLegend(map);

  const addLayer = (options: LayerOptions, immediate = true) => {
    const layer = ref<ReturnType<typeof useGeoJSON>>();

    /* Add images */
    const updateImages = async (images: Record<string, string> | undefined) => {
      if (!images) return;
      const _map = await map.promise;
      const { addImages, removeImages } = useImages(_map);
      removeImages(Object.keys(images));
      const { urls, ...imageOptions } = 'urls' in images ? images : { urls: images };
      addImages(urls as Record<string, string>, { ...imageOptions, persist: false });
      _map.once('style.load', () => updateImages(images));
    };

    /* React to layer changes */
    let scope: EffectScope;

    /* Load layer */
    const restoreLayer = async () => {
      const _map = await map.promise;
      const { legend, images, ...layerOptions } = unref(options);
      layer.value = useGeoJSON(_map, layerOptions);
      if (legend) addLegendLayers(legend);
      if (images) updateImages(images);

      scope = effectScope();
      scope.run(() => {
        if (!isRef(options)) return;
        watch(() => options.value.images, updateImages);
        watch(() => options.value.layers, layers => layer.value?.updateLayers(layers));
        watch(() => options.value.source, async source => {
          const data = await source;
          if (data) layer.value?.updateSource(data);
        });
      });
    };

    const removeLayer = async () => {
      const _map = await map.promise;
      const { removeImages } = useImages(_map);
      const { legend, images } = unref(options);
      scope?.stop();
      layer.value?.clearSource();
      layer.value = undefined;
      if (legend) removeLegendLayers(Object.keys(legend));
      if (images) removeImages(Object.keys(images));
    };

    onMounted(() => immediate && restoreLayer());
    onUnmounted(removeLayer);

    return { layer, restoreLayer, removeLayer };
  };

  return { addLayer };
};
