import React, { useEffect, useRef, useState, useMemo } from "react";
import MaplibreGL, { LngLatLike } from "maplibre-gl";
import { MaplibreUICtx, OnMapEventHandlers } from "../types";
import { pickHandlers } from "../util/pickHandlers";
import { createListeners } from "../util/createListeners";

export const MapCtx = React.createContext<MaplibreUICtx>({
  map: null,
  maplibre: MaplibreGL,
});

type BaseMaplibreUIProps = {
  /**
   * accessToken from maplibre, see https://docs.maplibre.com/help/how-maplibre-works/access-tokens/
   */
  accessToken?: string;
  /**
   * defaultCenter as [longitude, latitude]
   */
  defaultCenter: LngLatLike;
  /**
   * maplibre styleUrl, see https://docs.maplibre.com/help/glossary/style-url/
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
};

export type MaplibreUIProps = Partial<OnMapEventHandlers<BaseMaplibreUIProps>> &
  BaseMaplibreUIProps;

export const DEFAULT_MAP_STYLE = "maplibre://styles/maplibre/light-v10";
export const DEFAULT_MAP_ZOOM = 10;

export const Map: React.FC<MaplibreUIProps> = props => {
  const {
    // accessToken,
    mapStyle = DEFAULT_MAP_STYLE,
    children,
    defaultCenter,
    defaultZoom = DEFAULT_MAP_ZOOM,
    style,
    className,
    id,
    ...rest
  } = props;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<MaplibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [onHandlers, onceHandlers] = useMemo(() => pickHandlers(rest), [rest]);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new MaplibreGL.Map({
      // accessToken,
      container: mapContainer.current,
      style: mapStyle,
      center: defaultCenter,
      zoom: defaultZoom,
    });

    const onLoad = () => setIsLoaded(true);
    map.on("load", onLoad);
    setMapInstance(map);
    return () => {
      map.off("load", onLoad);
    };
    // eslint-disable-next-line
  }, [mapContainer.current]);

  useEffect(() => {
    const map = mapInstance;
    if (!map) return;

    const listenerCtx = {
      props,
      map,
      maplibre: MaplibreGL,
    };

    const onListeners = createListeners(onHandlers, map, listenerCtx, {
      listenType: "on",
    });

    const onceListeners = createListeners(onceHandlers, map, listenerCtx, {
      listenType: "once",
    });

    onListeners.addListeners();
    onceListeners.addListeners();
    return () => {
      onListeners.removeListeners();
      onceListeners.removeListeners();
    };
    // eslint-disable-next-line
  }, [mapInstance, onHandlers, onceHandlers]);

  const ctxValue = useMemo(() => {
    return { map: mapInstance, maplibre: MaplibreGL };
  }, [mapInstance]);

  return (
    <React.Fragment>
      <MapCtx.Provider value={ctxValue}>
        <div
          id={id}
          className={className}
          style={style}
          ref={ref => (mapContainer.current = ref)}
        />
        {isLoaded && children}
      </MapCtx.Provider>
    </React.Fragment>
  );
};
