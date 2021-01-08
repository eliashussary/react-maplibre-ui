import { AnyLayer } from "mapbox-gl";
import React from "react";
import { useMemo } from "react";
import { useMapboxUIEffect } from "../hooks";
import { pickHandlers } from "../util/pickHandlers";
import { createListeners } from "../util/createListeners";
import { OnLayerEventHandlers, MapboxLayerEventHandler } from "../types";

export type MapLayerProps = AnyLayer &
  Partial<OnLayerEventHandlers<AnyLayer>> & {
    onLoad?: MapboxLayerEventHandler<AnyLayer, any>;
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

  useMapboxUIEffect(
    ({ map, mapbox }) => {
      const exists = map.getLayer(id);
      if (exists) return;
      map.addLayer({
        id,
        ...layer,
      });

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

      if (onLoad) {
        onLoad({ map, mapbox, props });
      }

      return () => {
        onListeners.removeListeners();
        onceListeners.removeListeners();
      };
    },
    [id, onLoad, type, paint]
  );

  if (!children) return null;
  return <>{children}</>;
};
