"use client";

import { useForecastStore } from '@/store/forecastStore';
import { CloudRain } from 'lucide-react';

export const Precipitation = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  let precipitationMessage = "Conditions are dry.";
  let rain1h = 0;

  if (forecast?.rain) {
    rain1h = forecast.rain["1h"] || 0;
    if (rain1h > 0.2 && rain1h <= 2.5) precipitationMessage = "Moderate rain.";
    else if (rain1h > 2.5) precipitationMessage = "Heavy rain.";
    else if (rain1h > 0) precipitationMessage = "Light rain or drizzle. An umbrella may come in handy.";
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-4 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-200 dark:text-white">
        <CloudRain className="w-6 h-6" /> Precipitation
      </h2>
      <p className="py-2 text-4xl text-center font-semibold">{rain1h ?? 0}mm</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">{precipitationMessage}</p>
    </div>
  );
}
