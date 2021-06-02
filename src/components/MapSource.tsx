import { AnySourceData, GeoJSONSource } from "maplibre-gl";
import React from "react";
import { useMaplibreUIEffect } from "../hooks";
import { MaplibreLayerEventHandler } from "../types";

export type SourceProps = AnySourceData & {
  id: string;
  onLoad?: MaplibreLayerEventHandler<SourceProps, any>;
};

export const MapSource: React.FC<SourceProps> = props => {
  const { id, onLoad, children = null, ...source } = props;

  // possible source attributes we need to track
  // https://docs.maplibre.com/maplibre-gl-js/style-spec/sources/
  const { data } = source as { data: any };

  useMaplibreUIEffect(
    ({ map, maplibre }) => {
      map.addSource(id, source);

      if (onLoad) {
        onLoad({ map, maplibre, props });
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
    [id, onLoad]
  );

  useMaplibreUIEffect(
    ({ map }) => {
      const src = map.getSource(id) as GeoJSONSource;
      // @ts-ignore
      if (!src?.setData) return;
      src.setData(data);
    },
    [id, data]
  );

  if (!children) return null;

  return <>{children}</>;
};
