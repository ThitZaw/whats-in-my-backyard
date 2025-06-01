import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import DrawControl from "./DrawControl";

const MapView = () => {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[3.139, 101.6869]}
      zoom={13}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <DrawControl />
    </MapContainer>
  );
};

export default MapView;
