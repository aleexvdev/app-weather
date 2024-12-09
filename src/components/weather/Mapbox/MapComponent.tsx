/* "use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMarkerIcon } from "@/utils/misc";

interface MapComponentProps {
  coordinates: [number, number];
}

export const MapComponent = ({ coordinates }: MapComponentProps) => {

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerId = `mapa-${coordinates.join("-")}`;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapContainerId, {
      center: coordinates,
      zoom: 13,
      scrollWheelZoom: false,
      dragging: false, 
      zoomControl: false,
      doubleClickZoom: false,
      keyboard: false, 
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker(coordinates, { icon: getMarkerIcon() }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapContainerId, coordinates]);

  return <div id={mapContainerId} key={mapContainerId} style={{ height: "100%", width: "100%", borderRadius: "10px" }} />;
}; */