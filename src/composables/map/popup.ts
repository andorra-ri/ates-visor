import { ref, unref, isRef, watch, readonly, effectScope, onMounted, onUnmounted, type UnwrapRef } from 'vue';
import { usePopup, type Map, type PopupOptions, type MapLayerMouseEvent } from 'mapbox-composition';
import type { MaybeRef } from '/@/types';
import type { Deferred } from './utils';

export default (map: Deferred<Map>) => {
  const addPopup = <T>(options: MaybeRef<PopupOptions>) => {
    const popup = ref<ReturnType<typeof usePopup>>();
    const state = ref<{ name: string, data: T | undefined }>({
      name: '',
      data: undefined,
    });

    const bindClick = ({ lngLat, features }: MapLayerMouseEvent) => {
      popup.value?.setLocation(lngLat);
      state.value.data = features?.[0].properties as UnwrapRef<T>;
    };

    const scope = effectScope();
    scope.run(() => {
      if (!isRef(options)) return;
      watch(options, ({ coordinates, content }) => {
        if (coordinates) popup.value?.setLocation(coordinates);
        if (content) popup.value?.setContent(content);
      });
    });

    onMounted(async () => {
      const _map = await map.promise;
      popup.value = usePopup(_map, unref(options));
      state.value.name = popup.value.name;
    });

    onUnmounted(() => {
      scope.stop();
      popup.value?.clear();
      popup.value = undefined;
    });

    return { popup, content: readonly(state), bindClick };
  };

  return { addPopup };
};
