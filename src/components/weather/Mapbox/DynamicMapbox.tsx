'use client';

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useForecastStore } from '@/store/forecastStore';

const API_KEY_MAP = process.env.NEXT_PUBLIC_MAP_API_KEY;

export const DynamicMapbox = () => {
  const { currentForecast, loading, error } = useForecastStore();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !currentForecast?.coord) return;
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY_MAP}`,
      center: [Number(currentForecast.coord.lon), Number(currentForecast.coord.lat)],
      zoom: 9,
      scrollZoom: false,
      dragPan: false,
      doubleClickZoom: false,
      attributionControl: false,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  }, [currentForecast]);

  useEffect(() => {
    if (!mapLoaded || !map.current || !currentForecast?.coord) return;

    const { lon, lat } = currentForecast.coord;
    map.current.setCenter([Number(lon), Number(lat)]);

    if (marker.current) {
      marker.current.setLngLat([Number(lon), Number(lat)]);
    } else {
      marker.current = new maplibregl.Marker()
        .setLngLat([Number(lon), Number(lat)])
        .addTo(map.current);
    }
  }, [mapLoaded, currentForecast]);

  if (loading || error) {
    return <div className="w-full col-span-2 md:col-span-2 lg:col-span-3 min-h-60 md:min-h-full rounded-lg shadow-lg flex items-center justify-center bg-gray-400 dark:bg-gray-700 animate-pulse"></div>;
  }

  if (!currentForecast) {
    return <div className="w-full col-span-2 md:col-span-2 lg:col-span-3 min-h-60 md:min-h-full rounded-lg shadow-lg flex items-center justify-center bg-gray-400 dark:bg-gray-800">No map data available. Please check your connection or try again later.</div>;
  }

  return <div ref={mapContainer} className="w-full col-span-2 md:col-span-2 lg:col-span-3 min-h-60 md:min-h-full rounded-lg shadow-lg" />;
};