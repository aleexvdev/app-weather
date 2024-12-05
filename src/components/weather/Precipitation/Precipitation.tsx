"use client";

import { useForecastStore } from '@/store/forecastStore';
import { CloudRain } from 'lucide-react';

export const Precipitation = () => {

  const { currentForecast: forecast, loading } = useForecastStore();
  
  if (loading) return <div>Loading...</div>;

  const rain1h = forecast?.rain?.["1h"] || 0;

  const getPrecipitationMessage = (rain: number): string => {
    if (rain > 2.5) return "Heavy rain. Stay dry!";
    if (rain > 0.2) return "Moderate rain. Take precautions.";
    if (rain > 0) return "Light rain or drizzle. An umbrella may come in handy.";
    return "Conditions are dry.";
  };

  const precipitationMessage = getPrecipitationMessage(rain1h);

  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-4 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
        bg-gradient-to-b from-blue-300 via-blue-500 to-blue-400 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 text-gray-700 dark:text-gray-100"
    >
      <h2 className="flex items-center gap-1 text-xl font-semibold text-blue-900 dark:text-blue-200">
        <CloudRain className="w-6 h-6" /> Precipitation
      </h2>
      <div className="flex items-center justify-center gap-x-1">
        <p className="text-5xl text-center font-bold text-black dark:text-white">{rain1h.toFixed(1)}</p>
        <span className="text-base text-black dark:text-white font-semibold">mm</span>
      </div>
      <p className="text-sm text-center text-black dark:text-white font-medium">
        {precipitationMessage}
      </p>
    </div>
  );
}
