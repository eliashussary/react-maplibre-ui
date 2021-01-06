import React from "react";
import { Meta } from "@storybook/react";
import { Map, MapMarker, MapLayer, MapSource } from "../src";
import { LngLatLike } from "mapbox-gl";
import bbox from "@turf/bbox";
import geoJson from "./geojson.json";
import "mapbox-gl/dist/mapbox-gl.css";

const accesToken = process.env.MAPBOX_ACCESS_TOKEN;

const meta: Meta = {
  title: "MapboxUI",
  component: Map,
};

export default meta;

const centerCoorindates: LngLatLike = [-79.347015, 43.65107];

export const WithMarker = () => {
  return (
    <Map
      accessToken={accesToken}
      style={{
        height: "calc(100vh - 35px)",
        width: "100%",
      }}
      defaultCenter={centerCoorindates}
      onMove={(...args) => console.log("onMove", args)}
      onceLoad={(...args) => console.log("onceLoad", args)}
    >
      <MapMarker
        lngLat={centerCoorindates}
        onClick={(...args) => console.log("marker", args)}
      />

      <MapMarker
        lngLat={[-79.35365075220747, 43.675620889019754]}
        onClick={(...args) => console.log("marker", args)}
      >
        <div
          style={{
            height: 15,
            width: 15,
            background: "red",
            borderRadius: "50%",
          }}
        />
      </MapMarker>
    </Map>
  );
};

const zoomToBounds = (geojson: GeoJSON.Feature) => (props, { map }) => {
  const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
  map.fitBounds([
    [minLng, maxLat],
    [maxLng, minLat],
  ]);
};
export const WithGeoJson = () => {
  const id = "area";
  return (
    <Map
      accessToken={accesToken}
      style={{
        height: "calc(100vh - 35px)",
        width: "100%",
      }}
      defaultCenter={centerCoorindates}
      onMove={(...args) => console.log("onMove", args)}
      onceLoad={(...args) => console.log("onceLoad", args)}
    >
      <MapLayer
        id={id + "-fill"}
        source={id}
        type="fill"
        paint={{
          "fill-color": "#00b0f0",
          "fill-opacity": 0.5,
        }}
        onClick={zoomToBounds(geoJson as GeoJSON.Feature)}
        onLoad={zoomToBounds(geoJson as GeoJSON.Feature)}
      >
        <MapSource
          id={id}
          type="geojson"
          data={geoJson as GeoJSON.Feature}
          generateId
        />
      </MapLayer>
    </Map>
  );
};
