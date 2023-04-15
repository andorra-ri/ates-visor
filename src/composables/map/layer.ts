import { ref, watch, effectScope, onUnmounted } from 'vue';
import { useGeoJSON } from 'mapbox-composition';
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

    (async () => {
      const resolved = await map.promise;
      const { legend, ...layerOptions } = _options.value;
      layer.value = useGeoJSON(resolved, adaptLayers(layerOptions));
      if (legend) addLegendLayers(legend);
    })();

    const scope = effectScope();
    scope.run(() => {
      watch(_options, ({ source, layers }) => {
        layer.value?.updateSource(source);
        layer.value?.updateLayers(layers);
      });

      watch(locale, () => { // Re-add translated layers to trigger legend redraw
        const { layers } = adaptLayers({ layers: _options.value.layers });
        layer.value?.clearLayers(layers.map(({ name }) => name));
        layer.value?.addLayers(layers);
      });
    });

    onUnmounted(() => {
      scope.stop();
      layer.value?.clearSource();
      layer.value = undefined;
    });

    return layer;
  };

  return { addLayer };
};
