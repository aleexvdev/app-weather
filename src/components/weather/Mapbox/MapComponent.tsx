"use client";

import { useEffect, useMemo } from "react";
import { useLocationStore } from "@/store/locationStore";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMarkerIcon } from "@/utils/misc";

function MapUpdater() {
  const map = useMap();
  const { location } = useLocationStore();
  const { lat, lon } = location;

  useEffect(() => {
    if (!lat && !lon) {
      map.setView([lat, lon], 13);
    }
  }, [lat, lon, map]);

  return null;
}

export const MapComponent = () => {
  const { location } = useLocationStore();
  const { lat, lon } = location;

  const map = useMemo(() => {
    if (!lat && !lon) return null;
    return (
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        className="col-span-1 lg:col-span-3 row-span-2 min-h-60 md:min-h-full rounded-lg shadow-md px-6 py-4"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]} icon={getMarkerIcon()} />
        <MapUpdater />
      </MapContainer>
    );
  }, [lat, lon]);

  if (!lat && !lon) return null;

  return <>{map}</>;
};
