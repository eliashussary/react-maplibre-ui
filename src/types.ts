/* eslint-disable */
import MaplibreGL,{ EventData,MapEventType,MapLayerEventType } from "maplibre-gl";

export type NonNullMaplibreUICtx = {
  [P in keyof MaplibreUICtx]: Exclude<MaplibreUICtx[P], null>;
};

export type MaplibreUICtx = {
  mapbox: typeof MaplibreGL | null;
  map: MaplibreGL.Map | null;
};


export type EventHandlerContext<P> = NonNullMaplibreUICtx & {
  props: P
}

export type LayerEvents = keyof MapLayerEventType;
export type MaplibreLayerEventHandlerRaw<T extends LayerEvents> = ( evt?: MapLayerEventType[T] & EventData) => void
export type MaplibreLayerEventHandler<P, T extends LayerEvents> = (
  ctx: EventHandlerContext<P>,
  evt?: MapLayerEventType[T] & EventData
) => void;

export type MapEvents = keyof MapEventType;
export type MaplibreEventHandlerRaw<T extends MapEvents> = ( evt?: MapEventType[T] & EventData) => void
export type MaplibreEventHandler<P, T extends MapEvents> = (
  ctx: EventHandlerContext<P>,
  evt?: MapEventType[T] & EventData
) => void;


export type OnLayerEventHandlerName<T extends string> = `on${Capitalize<T>}`
export type OnceLayerEventHandlerName<T extends string> = `once${Capitalize<T>}`

export type OnLayerEventHandlers<P> = {
  [T in LayerEvents as OnLayerEventHandlerName<T>]: MaplibreLayerEventHandler<P, T>
} & {
  [T in LayerEvents as OnceLayerEventHandlerName<T>]: MaplibreLayerEventHandler<P, T>
}

export type OnMapEventHandlerName<T extends string> = `on${Capitalize<T>}`
export type OnceMapEventHandlerName<T extends string> = `once${Capitalize<T>}`


export type OnMapEventHandlers<P> = {
  [T in MapEvents as OnMapEventHandlerName<T>]: MaplibreEventHandler<P, T>
} & {
  [T in MapEvents as OnceMapEventHandlerName<T>]: MaplibreEventHandler<P, T>
}

export type OnEventListener<P> = OnMapEventHandlers<P> | OnLayerEventHandlers<P> 
export type OnEventHandlerRaw = MaplibreEventHandlerRaw<any> | MaplibreLayerEventHandlerRaw<any>
export type OnEventHandler<P> = (
  ctx: EventHandlerContext<P>,
  evt?:any
) => void;
