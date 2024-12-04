"use client";

import { Navbar } from "@/components/layout/Navbar";
import { WeatherGrid } from "@/components/WeatherGrid";
import { useAirPollutionStore } from "@/store/airPollutionStore";
import { useForecastStore } from "@/store/forecastStore";
import { useLocationStore } from "@/store/locationStore";
import { useEffect } from "react";

export default function Home() {

  const { location } = useLocationStore();
  const { fetchAirPollution } = useAirPollutionStore();
  const { fetchForecast } = useForecastStore();
  useEffect(() => {
    fetchForecast(location.lat, location.lon);
  }, [location, fetchForecast]);

  useEffect(() => {
    fetchAirPollution(location.lat, location.lon);
  }, [location, fetchAirPollution]);

  return (
    <main className="w-full h-full min-h-screen flex flex-col items-start justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <WeatherGrid />
    </main>
  );
}
