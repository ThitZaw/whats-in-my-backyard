import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import DrawControl from "./DrawControl";

const MapView = () => {

  const [polygonGeoJson, setPolygonGeoJson] = useState(null);
  const [polygonArea, setPolygonArea] = useState(null);

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        style={{ position: "relative",height: "100vh", width: "100%" }}
        center={[3.139, 101.6869]}
        zoom={13}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <DrawControl onGeoJsonChange={setPolygonGeoJson} onAreaChange={setPolygonArea}/>
      </MapContainer>
      
      {polygonGeoJson && (
        <div style={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            maxWidth: "400px",
            maxHeight: "60vh",
            overflowY: "auto",
            zIndex: 1000,
          }}>
          <h2 className="text-lg font-bold mb-2">Polygon Information</h2>
          <p><strong>Area:</strong> {polygonArea.toFixed(2)} km²</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-64">
            {JSON.stringify(polygonGeoJson, null, 2)}
          </pre>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => console.log("Ready to submit to backend")}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MapView;
