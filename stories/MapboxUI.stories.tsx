import React from 'react';
import { Meta } from '@storybook/react';
import { MapboxUI, useMapboxUIEffect } from '../src';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LngLatLike } from 'mapbox-gl';

const accesToken = process.env.MAPBOX_ACCESS_TOKEN;

const meta: Meta = {
  title: 'MapboxUI',
  component: MapboxUI,
};

export default meta;

const centerCoorindates: LngLatLike = [-79.347015, 43.65107];

const Marker: React.FC<{
  coordinates: LngLatLike;
}> = ({ coordinates }) => {
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

export const Default = () => {
  return (
    <MapboxUI
      accessToken={accesToken}
      style={{
        height: 'calc(100vh - 35px)',
        width: '100%',
      }}
      defaultCenter={centerCoorindates}
      on={{
        move: ev => console.log('move', ev),
      }}
      once={{
        load: () => console.log('loaded'),
      }}
    >
      <Marker coordinates={centerCoorindates} />
    </MapboxUI>
  );
};
