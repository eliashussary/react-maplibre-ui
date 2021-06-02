import { LngLatLike } from "maplibre-gl";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import {
  Map,
  DEFAULT_MAP_STYLE,
  DEFAULT_MAP_ZOOM,
  useMaplibreUI,
  useMaplibreUIEffect,
} from "../src";

const mockConstructor = jest.fn();
const mockSetLngLat = jest.fn();
const mockAddToMap = jest.fn();
const mockRemove = jest.fn();
const mockOnListener = jest.fn();

jest.mock("maplibre-gl", () => {
  return {
    Map: class {
      constructor(opts: any) {
        mockConstructor(opts);
        return this;
      }
      on(type: string, cb: Function) {
        mockOnListener(type, cb);
        cb();
      }
    },
    Marker: class {
      setLngLat(args: any) {
        mockSetLngLat(args);
        return this;
      }
      addTo(args: any) {
        mockAddToMap(args);
        return this;
      }
      remove() {
        mockRemove();
      }
    },
  };
});

const mockAccessToken = "mock-access-token";
const mockCenter: LngLatLike = [-79.347015, 43.65107];

let container: HTMLDivElement;
describe("MaplibreUI", () => {
  beforeEach(() => {
    container = document.createElement("div");
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("renders component", () => {
    act(() => {
      ReactDOM.render(
        <Map accessToken={mockAccessToken} defaultCenter={mockCenter} />,
        container
      );
    });

    expect(mockConstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: mockAccessToken,
        center: mockCenter,
        style: DEFAULT_MAP_STYLE,
        zoom: DEFAULT_MAP_ZOOM,
        container: expect.anything(),
      })
    );
  });

  it("provides context with useMaplibreUI", () => {
    let mapCtx, maplibreCtx: any;

    const MockComponent = () => {
      const { map, maplibre } = useMaplibreUI();
      mapCtx = map;
      maplibreCtx = maplibre;
      return null;
    };
    act(() => {
      ReactDOM.render(
        <Map accessToken={mockAccessToken} defaultCenter={mockCenter}>
          <MockComponent />
        </Map>,
        container
      );
    });

    expect(mapCtx).toBeTruthy();
    expect(maplibreCtx).toBeTruthy();
  });

  it("provides context with useMaplibreUIEffect and runs the effect", () => {
    let mapCtx;

    const Marker: React.FC<{
      coordinates: LngLatLike;
    }> = ({ coordinates }) => {
      useMaplibreUIEffect(
        ({ map, maplibre }) => {
          mapCtx = map;
          const marker = new maplibre!.Marker()
            .setLngLat(coordinates)
            .addTo(map!);

          return () => {
            marker.remove();
          };
        },
        [coordinates]
      );

      return null;
    };
    act(() => {
      ReactDOM.render(
        <Map accessToken={mockAccessToken} defaultCenter={mockCenter}>
          <Marker coordinates={mockCenter} />
        </Map>,
        container
      );
    });

    expect(mockSetLngLat).toBeCalledWith(mockCenter);
    expect(mockAddToMap).toBeCalledWith(mapCtx);
    expect(mockRemove).toHaveBeenCalled();
  });

  it.todo("test for MapMarker");
  it.todo("test for MapLayer");
  it.todo("test for MapSource");
});
