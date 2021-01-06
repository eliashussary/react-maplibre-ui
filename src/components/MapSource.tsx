import { AnySourceData } from "mapbox-gl";
import React from "react";
import { useMapboxUIEffect } from "../hooks";
import { MapboxLayerEventHandler } from "../types";

export type SourceProps = AnySourceData & {
  id: string;
  onLoad?: MapboxLayerEventHandler<SourceProps, any>;
};

export const MapSource: React.FC<SourceProps> = props => {
  const { id, onLoad, children = null, ...source } = props;

  useMapboxUIEffect(
    ({ map, mapbox }) => {
      map.addSource(id, source);

      if (onLoad) {
        onLoad(props, { map, mapbox });
      }

      return () => {
        map.getStyle().layers?.forEach(l => {
          // @ts-ignore
          if (l.source === id) {
            map.removeLayer(l.id);
          }
        });
        map.removeSource(id);
      };
    },
    [id, onLoad, source]
  );

  if (!children) return null;

  return <>{children}</>;
};
