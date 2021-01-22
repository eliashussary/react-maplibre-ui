[react-mapbox-ui](README.md) / Exports

# react-mapbox-ui

## Index

### Type aliases

* [EventHandlerContext](modules.md#eventhandlercontext)
* [LayerEvents](modules.md#layerevents)
* [MapEvents](modules.md#mapevents)
* [MapLayerProps](modules.md#maplayerprops)
* [MapMarkerProps](modules.md#mapmarkerprops)
* [MapboxEventHandler](modules.md#mapboxeventhandler)
* [MapboxEventHandlerRaw](modules.md#mapboxeventhandlerraw)
* [MapboxLayerEventHandler](modules.md#mapboxlayereventhandler)
* [MapboxLayerEventHandlerRaw](modules.md#mapboxlayereventhandlerraw)
* [MapboxUICtx](modules.md#mapboxuictx)
* [MapboxUIProps](modules.md#mapboxuiprops)
* [NonNullMapboxUICtx](modules.md#nonnullmapboxuictx)
* [OnEventHandler](modules.md#oneventhandler)
* [OnEventHandlerRaw](modules.md#oneventhandlerraw)
* [OnEventListener](modules.md#oneventlistener)
* [OnLayerEventHandlerName](modules.md#onlayereventhandlername)
* [OnLayerEventHandlers](modules.md#onlayereventhandlers)
* [OnMapEventHandlerName](modules.md#onmapeventhandlername)
* [OnMapEventHandlers](modules.md#onmapeventhandlers)
* [OnceLayerEventHandlerName](modules.md#oncelayereventhandlername)
* [OnceMapEventHandlerName](modules.md#oncemapeventhandlername)
* [SourceProps](modules.md#sourceprops)

### Variables

* [DEFAULT\_MAP\_STYLE](modules.md#default_map_style)
* [DEFAULT\_MAP\_ZOOM](modules.md#default_map_zoom)
* [Map](modules.md#map)
* [MapCtx](modules.md#mapctx)
* [MapLayer](modules.md#maplayer)
* [MapMarker](modules.md#mapmarker)
* [MapSource](modules.md#mapsource)

### Functions

* [useMapboxUI](modules.md#usemapboxui)
* [useMapboxUIEffect](modules.md#usemapboxuieffect)

## Type aliases

### EventHandlerContext

Ƭ **EventHandlerContext**<P\>: [*NonNullMapboxUICtx*](modules.md#nonnullmapboxuictx) & { `props`: P  }

#### Type parameters:

Name |
------ |
`P` |

Defined in: [types.ts:14](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L14)

___

### LayerEvents

Ƭ **LayerEvents**: keyof MapLayerEventType

Defined in: [types.ts:18](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L18)

___

### MapEvents

Ƭ **MapEvents**: keyof MapEventType

Defined in: [types.ts:25](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L25)

___

### MapLayerProps

Ƭ **MapLayerProps**: AnyLayer & *Partial*<[*OnLayerEventHandlers*](modules.md#onlayereventhandlers)<AnyLayer\>\> & { `onLoad?`: [*MapboxLayerEventHandler*](modules.md#mapboxlayereventhandler)<AnyLayer, *any*\>  }

Defined in: [components/MapLayer.tsx:9](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapLayer.tsx#L9)

___

### MapMarkerProps

Ƭ **MapMarkerProps**: *Partial*<[*OnMapEventHandlers*](modules.md#onmapeventhandlers)<BaseMapMarkerProps\>\> & BaseMapMarkerProps

Defined in: [components/MapMarker.tsx:13](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapMarker.tsx#L13)

___

### MapboxEventHandler

Ƭ **MapboxEventHandler**<P, T\>: (`ctx`: [*EventHandlerContext*](modules.md#eventhandlercontext)<P\>, `evt?`: MapEventType[T] & EventData) => *void*

#### Type parameters:

Name | Type |
------ | ------ |
`P` | - |
`T` | [*MapEvents*](modules.md#mapevents) |

Defined in: [types.ts:27](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L27)

___

### MapboxEventHandlerRaw

Ƭ **MapboxEventHandlerRaw**<T\>: (`evt?`: MapEventType[T] & EventData) => *void*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [*MapEvents*](modules.md#mapevents) |

Defined in: [types.ts:26](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L26)

___

### MapboxLayerEventHandler

Ƭ **MapboxLayerEventHandler**<P, T\>: (`ctx`: [*EventHandlerContext*](modules.md#eventhandlercontext)<P\>, `evt?`: MapLayerEventType[T] & EventData) => *void*

#### Type parameters:

Name | Type |
------ | ------ |
`P` | - |
`T` | [*LayerEvents*](modules.md#layerevents) |

Defined in: [types.ts:20](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L20)

___

### MapboxLayerEventHandlerRaw

Ƭ **MapboxLayerEventHandlerRaw**<T\>: (`evt?`: MapLayerEventType[T] & EventData) => *void*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [*LayerEvents*](modules.md#layerevents) |

Defined in: [types.ts:19](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L19)

___

### MapboxUICtx

Ƭ **MapboxUICtx**: { `map`: MapboxGL.Map \| *null* ; `mapbox`: *typeof* MapboxGL \| *null*  }

#### Type declaration:

Name | Type |
------ | ------ |
`map` | MapboxGL.Map \| *null* |
`mapbox` | *typeof* MapboxGL \| *null* |

Defined in: [types.ts:8](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L8)

___

### MapboxUIProps

Ƭ **MapboxUIProps**: *Partial*<[*OnMapEventHandlers*](modules.md#onmapeventhandlers)<BaseMapboxUIProps\>\> & BaseMapboxUIProps

Defined in: [components/Map.tsx:40](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/Map.tsx#L40)

___

### NonNullMapboxUICtx

Ƭ **NonNullMapboxUICtx**: { [P in keyof MapboxUICtx]: Exclude<MapboxUICtx[P], null\>}

Defined in: [types.ts:4](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L4)

___

### OnEventHandler

Ƭ **OnEventHandler**<P\>: (`ctx`: [*EventHandlerContext*](modules.md#eventhandlercontext)<P\>, `evt?`: *any*) => *void*

#### Type parameters:

Name |
------ |
`P` |

Defined in: [types.ts:54](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L54)

___

### OnEventHandlerRaw

Ƭ **OnEventHandlerRaw**: [*MapboxEventHandlerRaw*](modules.md#mapboxeventhandlerraw)<*any*\> \| [*MapboxLayerEventHandlerRaw*](modules.md#mapboxlayereventhandlerraw)<*any*\>

Defined in: [types.ts:53](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L53)

___

### OnEventListener

Ƭ **OnEventListener**<P\>: [*OnMapEventHandlers*](modules.md#onmapeventhandlers)<P\> \| [*OnLayerEventHandlers*](modules.md#onlayereventhandlers)<P\>

#### Type parameters:

Name |
------ |
`P` |

Defined in: [types.ts:52](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L52)

___

### OnLayerEventHandlerName

Ƭ **OnLayerEventHandlerName**<T\>: \`on${Capitalize<T\>}\`

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *string* |

Defined in: [types.ts:33](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L33)

___

### OnLayerEventHandlers

Ƭ **OnLayerEventHandlers**<P\>: { [T in LayerEvents as OnLayerEventHandlerName<T\>]: MapboxLayerEventHandler<P, T\>} & { [T in LayerEvents as OnceLayerEventHandlerName<T\>]: MapboxLayerEventHandler<P, T\>}

#### Type parameters:

Name |
------ |
`P` |

Defined in: [types.ts:36](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L36)

___

### OnMapEventHandlerName

Ƭ **OnMapEventHandlerName**<T\>: \`on${Capitalize<T\>}\`

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *string* |

Defined in: [types.ts:42](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L42)

___

### OnMapEventHandlers

Ƭ **OnMapEventHandlers**<P\>: { [T in MapEvents as OnMapEventHandlerName<T\>]: MapboxEventHandler<P, T\>} & { [T in MapEvents as OnceMapEventHandlerName<T\>]: MapboxEventHandler<P, T\>}

#### Type parameters:

Name |
------ |
`P` |

Defined in: [types.ts:46](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L46)

___

### OnceLayerEventHandlerName

Ƭ **OnceLayerEventHandlerName**<T\>: \`once${Capitalize<T\>}\`

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *string* |

Defined in: [types.ts:34](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L34)

___

### OnceMapEventHandlerName

Ƭ **OnceMapEventHandlerName**<T\>: \`once${Capitalize<T\>}\`

#### Type parameters:

Name | Type |
------ | ------ |
`T` | *string* |

Defined in: [types.ts:43](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/types.ts#L43)

___

### SourceProps

Ƭ **SourceProps**: AnySourceData & { `id`: *string* ; `onLoad?`: [*MapboxLayerEventHandler*](modules.md#mapboxlayereventhandler)<[*SourceProps*](modules.md#sourceprops), *any*\>  }

Defined in: [components/MapSource.tsx:6](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapSource.tsx#L6)

## Variables

### DEFAULT\_MAP\_STYLE

• `Const` **DEFAULT\_MAP\_STYLE**: *mapbox://styles/mapbox/light-v10*= "mapbox://styles/mapbox/light-v10"

Defined in: [components/Map.tsx:43](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/Map.tsx#L43)

___

### DEFAULT\_MAP\_ZOOM

• `Const` **DEFAULT\_MAP\_ZOOM**: *10*= 10

Defined in: [components/Map.tsx:44](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/Map.tsx#L44)

___

### Map

• `Const` **Map**: *React.FC*<[*MapboxUIProps*](modules.md#mapboxuiprops)\>

Defined in: [components/Map.tsx:46](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/Map.tsx#L46)

___

### MapCtx

• `Const` **MapCtx**: *Context*<[*MapboxUICtx*](modules.md#mapboxuictx)\>

Defined in: [components/Map.tsx:7](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/Map.tsx#L7)

___

### MapLayer

• `Const` **MapLayer**: *React.FC*<[*MapLayerProps*](modules.md#maplayerprops)\>

Defined in: [components/MapLayer.tsx:14](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapLayer.tsx#L14)

___

### MapMarker

• `Const` **MapMarker**: *React.FC*<[*MapMarkerProps*](modules.md#mapmarkerprops)\>

Defined in: [components/MapMarker.tsx:16](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapMarker.tsx#L16)

___

### MapSource

• `Const` **MapSource**: *React.FC*<[*SourceProps*](modules.md#sourceprops)\>

Defined in: [components/MapSource.tsx:11](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/components/MapSource.tsx#L11)

## Functions

### useMapboxUI

▸ `Const`**useMapboxUI**(): [*MapboxUICtx*](modules.md#mapboxuictx)

useMapboxUI is a simple wrapper around `useContext(MapCtx)`
it provides the Map instance and mapbox module
this hook does not ensure the context proivde was mounted

**`example`** 
```
const { map,mapbox } = useMapboxUI()
```

**Returns:** [*MapboxUICtx*](modules.md#mapboxuictx)

Defined in: [hooks.ts:14](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/hooks.ts#L14)

___

### useMapboxUIEffect

▸ `Const`**useMapboxUIEffect**(`effect`: MapboxUIEffectCallback, `deps`: *any*[]): *void*

useMapboxUIEffect wraps useMapboxUI in a useEffect
this hook ensures the map instance is created
and the context provider was mounted

**`example`** 
```
useMapboxUIEffect(
 ({ map, mapbox }) => {
    const marker = new mapbox.Marker().setLngLat(coordinates).addTo(map);

    return () => {
      marker.remove();
    };
  },
  [coordinates]
);
```

#### Parameters:

Name | Type |
------ | ------ |
`effect` | MapboxUIEffectCallback |
`deps` | *any*[] |

**Returns:** *void*

Defined in: [hooks.ts:38](https://github.com/eliashussary/react-mapbox-ui/blob/25fc309/src/hooks.ts#L38)
