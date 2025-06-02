import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import geojsonArea from '@mapbox/geojson-area';

const DrawControl = ({ onGeoJsonChange, onAreaChange }) => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    // Step 2 & 3: listen for draw events and log GeoJSON
    map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItems.addLayer(layer);

        const geojson = layer.toGeoJSON();
        const areaInSqMeters = geojsonArea.geometry(geojson.geometry);
        const areaInSqKm = areaInSqMeters / 1e6;

        if(onGeoJsonChange) {
          onGeoJsonChange(geojson)
        }
        if (onAreaChange) {
          onAreaChange(areaInSqKm)
        }

    });

    return () => {
      map.off(L.Draw.Event.CREATED);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map,onGeoJsonChange,onAreaChange]);

  return null;
};

export default DrawControl;
