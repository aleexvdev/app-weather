"use client";

import { WeatherGrid } from "@/components/WeatherGrid";
import { useAirPollutionStore } from "@/store/airPollutionStore";
import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { useForecastStore } from "@/store/forecastStore";
import { useLocationStore } from "@/store/locationStore";
import { useEffect } from "react";

export default function Home() {

  const { location } = useLocationStore();
  const { fetchAirPollution } = useAirPollutionStore();
  const { fetchForecast } = useForecastStore();
  const { fetchDailyForecast } = useDailyForecastStore();

  useEffect(() => {
    fetchForecast(location.lat, location.lon);
  }, [location, fetchForecast]);

  useEffect(() => {
    fetchAirPollution(location.lat, location.lon);
  }, [location, fetchAirPollution]);

  useEffect(() => {
    fetchDailyForecast(location.lat, location.lon);
  }, [location, fetchDailyForecast]);

  return (
    <main className="w-full h-full min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <WeatherGrid />
    </main>
  );
}
