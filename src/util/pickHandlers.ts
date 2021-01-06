import { OnEventListener } from "../types";

const onType = "on";
const onceType = "once";
export function pickHandlers<T>(props: T) {
  const onHandlers = {} as OnEventListener<T>;
  const onceHandlers = {} as OnEventListener<T>;
  const rest = {};
  for (const key in props) {
    if (key.includes(onceType)) {
      // @ts-ignore
      onceHandlers[key] = props[key];
    } else if (key.includes(onType)) {
      // @ts-ignore
      onHandlers[key] = props[key];
    } else {
      // @ts-ignore
      rest[key] = props[key];
    }
  }

  return [onHandlers, onceHandlers, rest] as [
    OnEventListener<T>,
    OnEventListener<T>,
    T
  ];
}
