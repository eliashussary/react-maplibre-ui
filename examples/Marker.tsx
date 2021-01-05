import { MapboxUI, useMapboxUIEffect } from "../src"; // react-mapbox-ui
import { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = "your access token";

const centerCoorindates: LngLatLike = [-79.347015, 43.65107]; // Toronto

type MarkerProps = { coordinates: LngLatLike };

/**
 * Creating a <Marker/> component.
 * Most of your MapboxUI components will be renderless and hook into MapboxUI context with hooks
 * This allows consumers to manage their own Mapbox side effects with effect lifecycles
 **/
const Marker: React.FC<MarkerProps> = ({ coordinates }) => {
  // useMapboxUIEffect provides you with MapboxUI context wrapped in a useEffect
  useMapboxUIEffect(
    ({ map, mapbox }) => {
      const marker = new mapbox.Marker().setLngLat(coordinates).addTo(map);

      return () => {
        marker.remove();
      };
    },
    [coordinates]
  );

  return null;
};

const App = () => {
  return (
    <MapboxUI
      accessToken={accessToken}
      style={{
        height: "100vh",
        width: "100%",
      }}
      defaultCenter={centerCoorindates}
    >
      <Marker coordinates={centerCoorindates} />
    </MapboxUI>
  );
};
