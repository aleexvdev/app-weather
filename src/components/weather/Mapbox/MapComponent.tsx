/* "use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMarkerIcon } from "@/utils/misc";

interface MapUpdaterProps {
  coordinates: [number, number];
}

function MapUpdater({ coordinates }: MapUpdaterProps) {
  const map = useMap()

  useEffect(() => {
    map.setView(coordinates, 13)
  }, [coordinates, map])

  return null
}

interface MapComponentProps {
  coordinates: [number, number];
}

export const MapComponent = ({ coordinates }: MapComponentProps) => {

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 lg:row-span-1 min-h-60 md:min-h-full rounded-lg shadow-md px-6 py-4"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates} icon={getMarkerIcon()} />
      <MapUpdater coordinates={coordinates} />
    </MapContainer>
  );
};
 */