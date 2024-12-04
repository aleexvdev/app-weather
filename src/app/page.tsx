"use client";

import { Navbar } from "@/components/layout/Navbar";
import { WeatherGrid } from "@/components/WeatherGrid";
import { useForecastStore } from "@/store/forecastStore";
import { useEffect } from "react";

export default function Home() {

  const { fetchForecast, location = { lat: 44.34, lon: 10.99, name: 'Province of Turin' } } = useForecastStore();
  useEffect(() => {
    fetchForecast(location.lat, location.lon);
  }, [location, fetchForecast]);

  return (
    <main className="w-full h-full min-h-screen flex flex-col items-start justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <WeatherGrid />
    </main>
  );
}
