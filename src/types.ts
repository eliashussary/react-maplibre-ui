/* eslint-disable */
import MapboxGL,{ EventData,MapEventType,MapLayerEventType } from "mapbox-gl";

export type NonNullMapboxUICtx = {
  [P in keyof MapboxUICtx]: Exclude<MapboxUICtx[P], null>;
};

export type MapboxUICtx = {
  mapbox: typeof MapboxGL | null;
  map: MapboxGL.Map | null;
};


export type EventHandlerContext<P> = NonNullMapboxUICtx & {
  props: P
}

export type LayerEvents = keyof MapLayerEventType;
export type MapboxLayerEventHandlerRaw<T extends LayerEvents> = ( evt?: MapLayerEventType[T] & EventData) => void
export type MapboxLayerEventHandler<P, T extends LayerEvents> = (
  ctx: EventHandlerContext<P>,
  evt?: MapLayerEventType[T] & EventData
) => void;

export type MapEvents = keyof MapEventType;
export type MapboxEventHandlerRaw<T extends MapEvents> = ( evt?: MapEventType[T] & EventData) => void
export type MapboxEventHandler<P, T extends MapEvents> = (
  ctx: EventHandlerContext<P>,
  evt?: MapEventType[T] & EventData
) => void;


export type OnLayerEventHandlerName<T extends string> = `on${Capitalize<T>}`
export type OnceLayerEventHandlerName<T extends string> = `once${Capitalize<T>}`

export type OnLayerEventHandlers<P> = {
  [T in LayerEvents as OnLayerEventHandlerName<T>]: MapboxLayerEventHandler<P, T>
} & {
  [T in LayerEvents as OnceLayerEventHandlerName<T>]: MapboxLayerEventHandler<P, T>
}

export type OnMapEventHandlerName<T extends string> = `on${Capitalize<T>}`
export type OnceMapEventHandlerName<T extends string> = `once${Capitalize<T>}`


export type OnMapEventHandlers<P> = {
  [T in MapEvents as OnMapEventHandlerName<T>]: MapboxEventHandler<P, T>
} & {
  [T in MapEvents as OnceMapEventHandlerName<T>]: MapboxEventHandler<P, T>
}

export type OnEventListener<P> = OnMapEventHandlers<P> | OnLayerEventHandlers<P> 
export type OnEventHandlerRaw = MapboxEventHandlerRaw<any> | MapboxLayerEventHandlerRaw<any>
export type OnEventHandler<P> = (
  ctx: EventHandlerContext<P>,
  evt?:any
) => void;
