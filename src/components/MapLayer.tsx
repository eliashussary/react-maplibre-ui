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

  useMapboxUIEffect(
    ({ map, mapbox }) => {
      map.addLayer({
        id,
        ...layer,
      });

      const onListeners = createListeners(
        props,
        onHandlers,
        {
          map,
          mapbox,
        },
        "on",
        id
      );

      const onceListeners = createListeners(
        props,
        onceHandlers,
        {
          map,
          mapbox,
        },
        "once",
        id
      );

      onListeners.addListeners();
      onceListeners.addListeners();

      if (onLoad) {
        onLoad(props, { map, mapbox });
      }

      return () => {
        onListeners.removeListeners();
        onceListeners.removeListeners();
      };
    },
    [id, onLoad]
  );

  if (!children) return null;
  return <>{children}</>;
};
