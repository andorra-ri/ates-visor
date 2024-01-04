import { ref, computed, watch, type Ref } from 'vue';
import { useMap, type MapLayerMouseEvent } from './map';
import { useLayerAdapter } from './adapters';
import type { Trail } from '/@/types';
import config from '/@/config.yaml';

export const useTrailsMapper = (trails: Ref<Trail[]>) => {
  const { addLayer, toFeatureCollection, fitTo } = useMap();
  const { adaptLayer } = useLayerAdapter();

  const show = computed(() => !!trails.value.length);

  const clicked = ref<string>();

  const onClick = ({ features }: MapLayerMouseEvent) => {
    if (!features) return;
    clicked.value = features[0].properties?.routeCode;
  };

  const { restoreLayer, removeLayer } = addLayer(computed(() => {
    const source = toFeatureCollection(trails.value);
    return adaptLayer({ ...config.layers.ROUTE, source, onClick });
  }), false);

  watch(show, isVisible => {
    if (isVisible) restoreLayer();
    else removeLayer();
  }, { immediate: true });

  watch(trails, t => t.length && fitTo(t, { padding: 50 }));

  return { clicked };
};
