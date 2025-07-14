// src/components/LiveTracking.jsx

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
});

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

export default function LiveTracking({ currentPosition, destination }) {
  if (!currentPosition || !destination) {
    return (
      <div className="w-full h-60 flex items-center justify-center bg-gray-200 rounded-lg mt-2">
        <p className="text-gray-600">Waiting for location...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative z-0">
      <MapContainer
        center={[currentPosition.lat, currentPosition.lon]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Current position marker */}
        <Marker position={[currentPosition.lat, currentPosition.lon]} icon={locationIcon}>
          <Popup>Current Location</Popup>
        </Marker>

        {/* Destination marker */}
        <Marker position={[destination.lat, destination.lon]} icon={destinationIcon}>
          <Popup>Destination</Popup>
        </Marker>

        {/* Polyline between current and destination */}
        <Polyline
          positions={[
            [currentPosition.lat, currentPosition.lon],
            [destination.lat, destination.lon],
          ]}
          color="blue"
        />
      </MapContainer>
    </div>
  );
}
