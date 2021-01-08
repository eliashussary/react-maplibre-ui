import React from "react";
import { Meta } from "@storybook/react";
import { Map, MapMarker, MapLayer, MapSource } from "../src";
import { LngLatLike } from "mapbox-gl";
import bbox from "@turf/bbox";
import geoJson from "./geo.json";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState } from "@storybook/addons";
import debounce from "lodash/debounce";

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

const zoomToBounds = (geojson: GeoJSON.Feature) => ({ map }) => {
  const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
  map.fitBounds([
    [minLng, maxLat],
    [maxLng, minLat],
  ]);
};
export const WithGeoJson = () => {
  const [currentGeoIdx, setCurrentGeoIdx] = useState(0);
  const [moveState, setMoveState] = useState(null);
  const handleMove = useCallback(
    debounce((ctx, ev) => {
      console.log(ev);
      setMoveState(ev);
    }, 500),
    [setMoveState]
  );

  const id = "id" + currentGeoIdx;
  return (
    <div>
      <button
        onClick={() => {
          if (currentGeoIdx) {
            return setCurrentGeoIdx(0);
          }
          setCurrentGeoIdx(1);
        }}
      >
        Change Area
      </button>
      <Map
        accessToken={accesToken}
        style={{
          height: "calc(100vh - 35px)",
          width: "100%",
        }}
        defaultCenter={centerCoorindates}
        onMove={handleMove}
        onceLoad={(...args) => console.log("onceLoad", args)}
      >
        <MapMarker lngLat={centerCoorindates} />
        <MapLayer
          id={id + "-fill"}
          source={id}
          type="fill"
          paint={{
            "fill-color": "#00b0f0",
            "fill-opacity": 0.5,
          }}
          onClick={zoomToBounds(
            geoJson.features[currentGeoIdx] as GeoJSON.Feature
          )}
          onLoad={zoomToBounds(
            geoJson.features[currentGeoIdx] as GeoJSON.Feature
          )}
        >
          <MapSource
            id={id}
            type="geojson"
            data={geoJson.features[currentGeoIdx] as GeoJSON.Feature}
            generateId
          />
        </MapLayer>
      </Map>
    </div>
  );
};
