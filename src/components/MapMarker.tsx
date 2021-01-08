import React, { useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import MapboxGL, { LngLatLike } from "mapbox-gl";
import { useMapboxUIEffect } from "../hooks";
import { OnMapEventHandlers } from "../types";
import { createListeners } from "../util/createListeners";
import { pickHandlers } from "../util/pickHandlers";

type BaseMapMarkerProps = {
  lngLat: LngLatLike;
} & MapboxGL.MarkerOptions;

export type MapMarkerProps = Partial<OnMapEventHandlers<BaseMapMarkerProps>> &
  BaseMapMarkerProps;

export const MapMarker: React.FC<MapMarkerProps> = props => {
  const { lngLat, children, ...rest } = props;

  const el = useRef<HTMLDivElement | null>(null);
  const [onHandlers, onceHandlers] = useMemo(() => pickHandlers(rest), [rest]);

  useMapboxUIEffect(
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

      const onListeners = createListeners(
        props,
        onHandlers,
        {
          map,
          mapbox: MapboxGL,
        },
        "on"
      );

      const onceListeners = createListeners(
        props,
        onceHandlers,
        {
          map,
          mapbox: MapboxGL,
        },
        "once"
      );

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
