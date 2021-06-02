import React, { useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import MaplibreGL, { LngLatLike } from "maplibre-gl";
import { useMaplibreUIEffect } from "../hooks";
import { OnMapEventHandlers } from "../types";
import { createListeners } from "../util/createListeners";
import { pickHandlers } from "../util/pickHandlers";

type BaseMapMarkerProps = {
  lngLat: LngLatLike;
} & MaplibreGL.MarkerOptions;

export type MapMarkerProps = Partial<OnMapEventHandlers<BaseMapMarkerProps>> &
  BaseMapMarkerProps;

export const MapMarker: React.FC<MapMarkerProps> = props => {
  const { lngLat, children, ...rest } = props;

  const el = useRef<HTMLDivElement | null>(null);
  const [onHandlers, onceHandlers] = useMemo(() => pickHandlers(rest), [rest]);

  useMaplibreUIEffect(
    ({ map, mapbox }) => {
      const markerOptions = { ...rest };

      if (children) {
        el.current = document.createElement("div");
        markerOptions.element = el.current;
        ReactDOM.render(
          <React.Fragment>{children}</React.Fragment>,
          el.current
        );
      }
      const marker = new mapbox.Marker(markerOptions)
        .setLngLat(lngLat)
        .addTo(map);

      const listenerCtx = {
        props,
        map,
        mapbox,
      };
      const onListeners = createListeners(onHandlers, marker, listenerCtx, {
        listenType: "on",
      });

      const onceListeners = createListeners(onceHandlers, marker, listenerCtx, {
        listenType: "once",
      });

      onListeners.addListeners();
      onceListeners.addListeners();
      return () => {
        ReactDOM.unmountComponentAtNode(marker.getElement());
        onListeners.removeListeners();
        onceListeners.removeListeners();
        marker.remove();
      };
    },
    [lngLat, children]
  );

  return null;
};
