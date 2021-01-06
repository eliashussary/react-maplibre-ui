[react-mapbox-ui](README.md) / Exports

# react-mapbox-ui

## Index

### Type aliases

* [MapLayerProps](modules.md#maplayerprops)
* [MapboxUIProps](modules.md#mapboxuiprops)
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

### MapLayerProps

Ƭ **MapLayerProps**: AnyLayer & *Partial*<*OnLayerEventHandlers*<AnyLayer\>\> & { `onLoad?`: *MapboxLayerEventHandler*<AnyLayer, *any*\>  }

Defined in: [components/MapLayer.tsx:9](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/MapLayer.tsx#L9)

___

### MapboxUIProps

Ƭ **MapboxUIProps**: *Partial*<*OnMapEventHandlers*<BaseMapboxUIProps\>\> & BaseMapboxUIProps

Defined in: [components/Map.tsx:40](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/Map.tsx#L40)

___

### SourceProps

Ƭ **SourceProps**: AnySourceData & { `id`: *string* ; `onLoad?`: *MapboxLayerEventHandler*<[*SourceProps*](modules.md#sourceprops), *any*\>  }

Defined in: [components/MapSource.tsx:6](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/MapSource.tsx#L6)

## Variables

### DEFAULT\_MAP\_STYLE

• `Const` **DEFAULT\_MAP\_STYLE**: *mapbox://styles/mapbox/light-v10*= "mapbox://styles/mapbox/light-v10"

Defined in: [components/Map.tsx:43](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/Map.tsx#L43)

___

### DEFAULT\_MAP\_ZOOM

• `Const` **DEFAULT\_MAP\_ZOOM**: *10*= 10

Defined in: [components/Map.tsx:44](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/Map.tsx#L44)

___

### Map

• `Const` **Map**: *React.FC*<[*MapboxUIProps*](modules.md#mapboxuiprops)\>

Defined in: [components/Map.tsx:46](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/Map.tsx#L46)

___

### MapCtx

• `Const` **MapCtx**: *Context*<MapboxUICtx\>

Defined in: [components/Map.tsx:7](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/Map.tsx#L7)

___

### MapLayer

• `Const` **MapLayer**: *React.FC*<[*MapLayerProps*](modules.md#maplayerprops)\>

Defined in: [components/MapLayer.tsx:14](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/MapLayer.tsx#L14)

___

### MapMarker

• `Const` **MapMarker**: *React.FC*<MapMarkerProps\>

Defined in: [components/MapMarker.tsx:16](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/MapMarker.tsx#L16)

___

### MapSource

• `Const` **MapSource**: *React.FC*<[*SourceProps*](modules.md#sourceprops)\>

Defined in: [components/MapSource.tsx:11](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/components/MapSource.tsx#L11)

## Functions

### useMapboxUI

▸ `Const`**useMapboxUI**(): MapboxUICtx

useMapboxUI is a simple wrapper around `useContext(MapCtx)`
it provides the Map instance and mapbox module
this hook does not ensure the context proivde was mounted

**`example`** 
```
const { map,mapbox } = useMapboxUI()
```

**Returns:** MapboxUICtx

Defined in: [hooks.ts:14](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/hooks.ts#L14)

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

Defined in: [hooks.ts:38](https://github.com/eliashussary/react-mapbox-ui/blob/3326376/src/hooks.ts#L38)
