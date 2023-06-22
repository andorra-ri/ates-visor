import { ref, watch, effectScope, onUnmounted } from 'vue';
import { useGeoJSON } from 'mapbox-composition';
import { useI18n } from 'vue-i18n';
import useAdapters from './adapters';
import useLegend from './legend';
import useImages from './images';
import type { Map, LayerOptions } from './types';
import type { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const { locale } = useI18n();
  const { adaptLayers } = useAdapters();
  const { addLegendLayers, removeLegendLayers } = useLegend(map);
  const { addImages, removeImages, updateImages } = useImages(map);

  const addLayer = (options: LayerOptions) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle
    const layer = ref<ReturnType<typeof useGeoJSON>>();

    (async () => {
      const _map = await map.promise;
      const { legend, images, ...layerOptions } = _options.value;
      layer.value = useGeoJSON(_map, adaptLayers(layerOptions));
      if (legend) addLegendLayers(legend);
      if (images) addImages(images);
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

    const removeLayer = () => {
      const { legend, images } = _options.value;
      scope.stop();
      layer.value?.clearSource();
      layer.value = undefined;
      if (legend) removeLegendLayers(Object.keys(legend));
      if (images) removeImages(Object.keys(images));
    };

    onUnmounted(removeLayer);

    return layer;
  };

  return { addLayer };
};
