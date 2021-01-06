import {
  NonNullMapboxUICtx,
  OnEventListener,
  LayerEvents,
  OnEventHandlerRaw,
  OnEventHandler,
} from "../types";

export function createListeners<P>(
  props: P,
  onHandlers: OnEventListener<P>,
  mapCtx: NonNullMapboxUICtx,
  onOrOnce: "on" | "once" = "on",
  layerId?: string
) {
  const { map } = mapCtx;
  const handlers = [] as [LayerEvents, OnEventHandlerRaw][];

  for (const handlerType in onHandlers) {
    const type = handlerType.replace(onOrOnce, "").toLowerCase() as LayerEvents;

    const handler: OnEventHandlerRaw = ev => {
      // @ts-ignore
      const customHandler = onHandlers[handlerType] as OnEventHandler<any>;

      return customHandler(props, mapCtx, ev);
    };

    handlers.push([type, handler]);
  }

  const addListeners = () => {
    handlers.forEach(([type, handler]) => {
      if (layerId) {
        return map[onOrOnce](type, layerId, handler);
      }
      return map[onOrOnce](type, handler);
    });
  };

  const removeListeners = () => {
    handlers.forEach(([type, handler]) => {
      if (layerId) {
        return map.off(type, layerId, handler);
      }
      return map.off(type, handler);
    });
  };

  return { addListeners, removeListeners };
}
