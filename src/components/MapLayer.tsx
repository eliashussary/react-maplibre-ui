import { AnyLayer } from "maplibre-gl";
import React from "react";
import { useMemo } from "react";
import { useMaplibreUIEffect } from "../hooks";
import { pickHandlers } from "../util/pickHandlers";
import { createListeners } from "../util/createListeners";
import { OnLayerEventHandlers, MaplibreLayerEventHandler } from "../types";

export type MapLayerProps = AnyLayer &
  Partial<OnLayerEventHandlers<AnyLayer>> & {
    onLoad?: MaplibreLayerEventHandler<AnyLayer, any>;
  };

export const MapLayer: React.FC<MapLayerProps> = props => {
  const { id, onLoad, children, ...rest } = props;

  const [onHandlers, onceHandlers, layer] = useMemo(() => pickHandlers(rest), [
    rest,
  ]);
  // layer properties to trigger an effect
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
  // @ts-ignore
  const { type, paint } = layer;

  useMaplibreUIEffect(
    ({ map, mapbox }) => {
      const exists = map.getLayer(id);
      if (exists) return;
      map.addLayer({
        id,
        ...layer,
      });

      if (onLoad) {
        onLoad({ map, mapbox, props });
      }
    },
    [id, onLoad, type, paint]
  );

  useMaplibreUIEffect(
    ({ map, mapbox }) => {
      const listenerCtx = {
        props,
        map,
        mapbox,
      };
      const onListeners = createListeners(onHandlers, map, listenerCtx, {
        listenType: "on",
        layerId: id,
      });

      const onceListeners = createListeners(onceHandlers, map, listenerCtx, {
        listenType: "once",
        layerId: id,
      });

      onListeners.addListeners();
      onceListeners.addListeners();
      return () => {
        onListeners.removeListeners();
        onceListeners.removeListeners();
      };
    },
    [id, onHandlers, onceHandlers]
  );

  if (!children) return null;
  return <>{children}</>;
};
