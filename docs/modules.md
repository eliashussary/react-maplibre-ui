[react-mapbox-ui](README.md) / Exports

# react-mapbox-ui

## Index

### Interfaces

* [Listener](interfaces/listener.md)

### Type aliases

* [ListenerMap](modules.md#listenermap)
* [MapboxUICtx](modules.md#mapboxuictx)
* [MapboxUIProps](modules.md#mapboxuiprops)

### Variables

* [MapCtx](modules.md#mapctx)
* [MapboxUI](modules.md#mapboxui)

### Functions

* [useMapboxUI](modules.md#usemapboxui)
* [useMapboxUIEffect](modules.md#usemapboxuieffect)

## Type aliases

### ListenerMap

Ƭ **ListenerMap**: *Partial*<{ [T in keyof MapEventType]: Listener<T\>}\>

Defined in: MapboxUI.tsx:19

___

### MapboxUICtx

Ƭ **MapboxUICtx**: { `map`: MapboxGL.Map \| *null* ; `mapbox`: *typeof* MapboxGL \| *null*  }

#### Type declaration:

Name | Type |
------ | ------ |
`map` | MapboxGL.Map \| *null* |
`mapbox` | *typeof* MapboxGL \| *null* |

Defined in: MapboxUI.tsx:4

___

### MapboxUIProps

Ƭ **MapboxUIProps**: { `accessToken`: *string* ; `className?`: *string* ; `defaultCenter`: LngLatLike ; `defaultZoom?`: *number* ; `id?`: *string* ; `mapStyle?`: *string* ; `on?`: [*ListenerMap*](modules.md#listenermap) ; `once?`: [*ListenerMap*](modules.md#listenermap) ; `style?`: React.CSSProperties  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`accessToken` | *string* | accessToken from mapbox, see https://docs.mapbox.com/help/how-mapbox-works/access-tokens/   |
`className?` | *string* | container css className   |
`defaultCenter` | LngLatLike | defaultCenter as [longitude, latitude]   |
`defaultZoom?` | *number* | - |
`id?` | *string* | container div#id tag   |
`mapStyle?` | *string* | mapbox styleUrl, see https://docs.mapbox.com/help/glossary/style-url/   |
`on?` | [*ListenerMap*](modules.md#listenermap) | on MapEvent listeners, see https://docs.mapbox.com/mapbox-gl-js/api/events/   |
`once?` | [*ListenerMap*](modules.md#listenermap) | once MapEvent listeners, see https://docs.mapbox.com/mapbox-gl-js/api/events/   |
`style?` | React.CSSProperties | container style css properties   |

Defined in: MapboxUI.tsx:25

## Variables

### MapCtx

• `Const` **MapCtx**: *Context*<[*MapboxUICtx*](modules.md#mapboxuictx)\>

Defined in: MapboxUI.tsx:9

___

### MapboxUI

• `Const` **MapboxUI**: *React.FC*<[*MapboxUIProps*](modules.md#mapboxuiprops)\>

Defined in: MapboxUI.tsx:80

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

Defined in: hooks.ts:13

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

Defined in: hooks.ts:37
