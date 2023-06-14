import { useImages } from 'mapbox-composition';
import type { Map } from './types';
import { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const addImages = async (images: Record<string, string>) => {
    const _map = await map.promise;
    const use = useImages(_map);
    use.addImages(images);
  };

  const removeImages = async (images: string[]) => {
    const _map = await map.promise;
    const use = useImages(_map);
    use.removeImages(images);
  };

  const updateImages = async (images: Record<string, string>) => {
    removeImages(Object.keys(images));
    addImages(images);
  };

  return { addImages, removeImages, updateImages };
};
