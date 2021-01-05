import React, { useEffect, useRef, useState } from "react";
import MapboxGL, { MapEventType, EventData, LngLatLike } from "mapbox-gl";

export type MapboxUICtx = {
  mapbox: typeof MapboxGL | null;
  map: MapboxGL.Map | null;
};

export const MapCtx = React.createContext<MapboxUICtx>({
  map: null,
  mapbox: MapboxGL,
});

export interface Listener<T extends keyof MapEventType = any> {
  (listener: (ev: MapEventType[T] & EventData) => void): void;
  (listener: (ev: any) => void): void;
}

export type ListenerMap = Partial<
  {
    [T in keyof MapEventType]: Listener<T>;
  }
>;

export type MapboxUIProps = {
  /**
   * accessToken from mapbox, see https://docs.mapbox.com/help/how-mapbox-works/access-tokens/
   */
  accessToken: string;
  /**
   * defaultCenter as [longitude, latitude]
   */
  defaultCenter: LngLatLike;
  /**
   * mapbox styleUrl, see https://docs.mapbox.com/help/glossary/style-url/
   */
  mapStyle?: string;
  defaultZoom?: number;
  /**
   * container style css properties
   */
  style?: React.CSSProperties;
  /**
   * container css className
   */
  className?: string;
  /**
   * container div#id tag
   */
  id?: string;
  /**
   * on MapEvent listeners, see https://docs.mapbox.com/mapbox-gl-js/api/events/
   */
  on?: ListenerMap;
  /**
   * once MapEvent listeners, see https://docs.mapbox.com/mapbox-gl-js/api/events/
   */
  once?: ListenerMap;
};

function registerEventListeners(
  map: MapboxGL.Map | null,
  listeners: ListenerMap | undefined,
  listenerType: "on" | "once" = "on"
) {
  if (!map || !listeners) return;

  const offListeners: (() => void)[] = [];
  for (const eventListener of Object.entries(listeners)) {
    const [type, listener] = eventListener as [string, Listener];
    map[listenerType](type, listener);
    offListeners.push(() => map.off(type, listener));
  }

  return () => {
    offListeners.forEach(fn => fn());
  };
}

export const MapboxUI: React.FC<MapboxUIProps> = props => {
  const {
    accessToken,
    mapStyle = "mapbox://styles/mapbox/light-v10",
    children,
    defaultCenter,
    defaultZoom = 10,
    style,
    className,
    id,
    on,
    once,
  } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<MapboxGL.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new MapboxGL.Map({
      accessToken,
      container: mapContainer.current,
      style: mapStyle,
      center: defaultCenter,
      zoom: defaultZoom,
    });

    setMapInstance(map);
  }, [mapContainer.current]);

  useEffect(() => {
    const cleanup = registerEventListeners(mapInstance, on, "on");
    return cleanup;
  }, [mapInstance, on]);

  useEffect(() => {
    const cleanup = registerEventListeners(mapInstance, once, "once");
    return cleanup;
  }, [mapInstance, once]);

  return (
    <React.Fragment>
      <MapCtx.Provider value={{ map: mapInstance, mapbox: MapboxGL }}>
        <div
          id={id}
          className={className}
          style={style}
          ref={ref => (mapContainer.current = ref)}
        />
        {children}
      </MapCtx.Provider>
    </React.Fragment>
  );
};
