react-mapbox-ui / [Exports](modules.md)

# react-mapbox-ui

MapboxUI provides a minimal layer of abstraction for composing mapbox-gl UI's in an idiomatic React way.

As a base, this library provides you with the following components:

- Map
- MapLayer
- MapSource
- MapMarker

## Install

```sh
yarn add react-mapbox-ui
# or
npm i react-mapbox-ui
```

## Usage

See [TypeDocs](/docs/modules.md).

Composing your own MapboxUI components.

```tsx
import { Map, MapMarker } from "react-mapbox-ui";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = "your access token";
const centerCoorindates: LngLatLike = [-79.347015, 43.65107]; // Toronto
const cnTower: LngLatLike = [-79.38694839252216, 43.64265954350144];
const geoJson = {};

const App = () => {
  return (
    <Map
      accessToken={accessToken}
      style={{
        height: "100vh",
        width: "100%",
      }}
      defaultCenter={centerCoorindates}
    >
      {/* render a standard marker marker */}
      <MapMarker lngLat={centerCoorindates} />
      <MapMarker lngLat={cnTower}>
        {/* render an html marker */}
        <div>CN Tower</div>
      </MapMarker>

      {/* render a layer */}
      <MapLayer
        id="area-fill"
        source="area"
        type="fill"
        paint={{
          "fill-color": "red",
          "fill-opacity": 0.5,
        }}
      >
        <MapSource id="area" type="geojson" data={geoJson} generateId />
      </MapLayer>
    </Map>
  );
};
```
