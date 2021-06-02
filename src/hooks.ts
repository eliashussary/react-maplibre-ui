import { useContext, useEffect } from "react";
import { MapCtx } from "./components/Map";
import { NonNullMaplibreUICtx } from "./types";

/**
 * useMaplibreUI is a simple wrapper around `useContext(MapCtx)`
 * it provides the Map instance and maplibre module
 * this hook does not ensure the context proivde was mounted
 * @example
 * ```
 * const { map,maplibre } = useMaplibreUI()
 * ```
 */
export const useMaplibreUI = () => useContext(MapCtx);

type MaplibreUIEffectCallback = (
  mapCtx: NonNullMaplibreUICtx
) => void | (() => void);

/**
 * useMaplibreUIEffect wraps useMaplibreUI in a useEffect
 * this hook ensures the map instance is created
 * and the context provider was mounted
 * @example
 * ```
 * useMaplibreUIEffect(
 *  ({ map, maplibre }) => {
 *     const marker = new maplibre.Marker().setLngLat(coordinates).addTo(map);
 *
 *     return () => {
 *       marker.remove();
 *     };
 *   },
 *   [coordinates]
 * );
 * ```
 */
export const useMaplibreUIEffect = (
  effect: MaplibreUIEffectCallback,
  deps: any[]
) => {
  const { map, maplibre } = useMaplibreUI();
  useEffect(() => {
    if (!map || !maplibre) return;
    const rt = effect({ map: map, maplibre: maplibre });
    return rt;
    // eslint-disable-next-line
  }, [map, maplibre, ...deps]);
};
