# react-maplibre-ui

> This was a fork of [`react-mapbox-ui`](https://github.com/eliashussary/react-mapbox-ui)

MaplibreUI provides a minimal layer of abstraction for composing maplibre-gl UI's in an idiomatic React way.

As a base, this library provides you with the following components:

- Map
- MapLayer
- MapSource
- MapMarker

## Install

```sh
yarn add react-maplibre-ui
# or
npm i react-maplibre-ui
```

## Usage

See [TypeDocs](/docs/modules.md).

Composing your own MaplibreUI components.

```tsx
import { Map, MapMarker } from "react-maplibre-ui";
import "maplibre-gl/dist/maplibre-gl.css";

const accessToken = "your access token";
const centerCoorindates: LngLatLike = [-79.347015, 43.65107]; // Toronto
const cnTower: LngLatLike = [-79.38694839252216, 43.64265954350144];
const geoJson = {};

const App = () => {
  return (
    <Map
      // you can use MapboxGL with an accesstoken
      // accessToken={accessToken}

      // maptiler usage
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${accessToken}`}
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
