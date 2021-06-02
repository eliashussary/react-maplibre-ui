import {
  OnEventListener,
  LayerEvents,
  OnEventHandlerRaw,
  OnEventHandler,
  EventHandlerContext,
} from "../types";
import { Map, Marker } from "maplibre-gl";

interface ListenerOptions {
  listenType: "on" | "once";
  layerId?: string;
}

export function createListeners<P>(
  onHandlers: OnEventListener<P>,
  target: Map | Marker,
  ctx: EventHandlerContext<P>,
  opts: ListenerOptions = { listenType: "on" }
) {
  const handlers = [] as [LayerEvents, OnEventHandlerRaw][];

  const { listenType, layerId } = opts;

  for (const handlerType in onHandlers) {
    const type = handlerType
      .replace(listenType, "")
      .toLowerCase() as LayerEvents;

    const handler: OnEventHandlerRaw = ev => {
      // @ts-ignore
      const customHandler = onHandlers[handlerType] as OnEventHandler<any>;

      return customHandler(ctx, ev);
    };

    handlers.push([type, handler]);
  }

  const addListeners = () => {
    handlers.forEach(([type, handler]) => {
      if (opts.layerId) {
        return (target as Map)[listenType](type, opts.layerId, handler);
      }
      return target[listenType](type, handler);
    });
  };

  const removeListeners = () => {
    handlers.forEach(([type, handler]) => {
      if (layerId) {
        return (target as Map).off(type, layerId, handler);
      }
      return target.off(type, handler);
    });
  };

  return { addListeners, removeListeners };
}
