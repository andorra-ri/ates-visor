import { useI18n } from 'vue-i18n';
import type { LayerOptions } from 'mapbox-composition';

type Metadata = {
  name?: string;
  unit?: string;
  labels?: Record<string, string | false>;
};

export const useLayerAdapter = () => {
  const { t, te } = useI18n();

  const localizeMetadata = (metadata: Metadata) => {
    const { unit, name, labels = {} } = metadata;
    return {
      name: t(`map.legend.${name}.title`),
      unit: te(`map.legend.${name}.unit`) ? t(`map.legend.${name}.unit`) : unit,
      labels: Object.entries(labels).reduce((acc, [label, key]) => {
        acc[label] = !!key && t(`map.legend.${name}.${key}`);
        return acc;
      }, {} as Record<string, string | boolean>),
    };
  };

  const adaptLayer = <T extends { layers: LayerOptions[] }>(options: T) => {
    const layers = options.layers.map(layer => {
      const metadata = layer.metadata ? localizeMetadata(layer.metadata) : undefined;
      return { ...layer, metadata };
    });
    return { ...options, layers };
  };

  return { adaptLayer };
};
