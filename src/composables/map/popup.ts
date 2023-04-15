import { ref, watch, readonly, effectScope, onUnmounted } from 'vue';
import { usePopup } from 'mapbox-composition';
import type { Map, PopupOptions, MapMouseEvent } from './types';
import type { MaybeRef } from '/@/types';
import type { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const addPopup = <T>(options: MaybeRef<PopupOptions>) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle

    const popup = ref<ReturnType<typeof usePopup>>();
    const state = ref<{ name: string, data: T | undefined}>({
      name: _options.value.name,
      data: undefined,
    });

    (async () => {
      const resolved = await map.promise;
      popup.value = usePopup(resolved, _options.value);
    })();

    const bindClick = ({ lngLat, features }: MapMouseEvent) => {
      popup.value?.setLocation(lngLat);
      state.value.data = features[0].properties;
    };

    const scope = effectScope();
    scope.run(() => {
      watch(_options, ({ coordinates, content }) => {
        if (coordinates) popup.value?.setLocation(coordinates);
        if (content) popup.value?.setContent(content);
      });
    });

    onUnmounted(() => {
      scope.stop();
      popup.value?.popup.remove();
      popup.value = undefined;
    });

    return { popup, content: readonly(state), bindClick };
  };

  return { addPopup };
};
