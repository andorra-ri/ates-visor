import { ref, watch, effectScope, onUnmounted } from 'vue';
import { useGeoJSON, useImages } from 'mapbox-composition';
import { useI18n } from 'vue-i18n';
import useAdapters from './adapters';
import useLegend from './legend';
import type { Map, LayerOptions } from './types';
import type { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const { locale } = useI18n();
  const { adaptLayers } = useAdapters();
  const { addLegendLayers } = useLegend(map);

  const addLayer = (options: LayerOptions) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle
    const layer = ref<ReturnType<typeof useGeoJSON>>();

    const updateImages = async (images: Record<string, string>) => {
      const _map = await map.promise;
      const { addImages, removeImages } = useImages(_map);
      removeImages(Object.keys(images));
      addImages(images);
    };

    (async () => {
      const { legend, images, ...layerOptions } = _options.value;
      const _map = await map.promise;
      layer.value = useGeoJSON(_map, adaptLayers(layerOptions));
      if (legend) addLegendLayers(legend);
      if (images) {
        updateImages(images);
        _map.on('styleload', updateImages);
      }
    })();

    const scope = effectScope();
    scope.run(() => {
      watch(_options, ({ images, ...layerOptions }) => {
        const { source, layers } = adaptLayers(layerOptions);
        layer.value?.updateSource(source);
        layer.value?.updateLayers(layers);
        if (images) updateImages(images);
      });

      watch(locale, () => { // Re-add translated layers to trigger legend redraw
        const { layers } = adaptLayers({ layers: _options.value.layers });
        layer.value?.clearLayers(layers.map(({ name }) => name));
        layer.value?.addLayers(layers);
      });
    });

    onUnmounted(async () => {
      const _map = await map.promise;
      scope.stop();
      layer.value?.clearSource();
      layer.value = undefined;
      _map.off('styleload', updateImages);
    });

    return layer;
  };

  return { addLayer };
};
