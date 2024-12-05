"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Gauge } from "lucide-react";

export const Pressure = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No pressure data found.</div>;

  const { pressure } = forecast.main;

  const getPressureDescription = (pressure: number): string => {
    if (pressure < 1000) return "Very low pressure. Weather may be unstable.";
    if (pressure < 1015) return "Low pressure. Potential weather changes.";
    if (pressure < 1025) return "Normal pressure. Stable conditions.";
    if (pressure < 1040) return "High pressure. Generally clear weather.";
    return "Very high pressure. Calm and stable conditions.";
  };

  const pressureDescription = getPressureDescription(pressure);

  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
        bg-gradient-to-b from-indigo-400 via-indigo-700 to-indigo-900 dark:from-indigo-800 dark:to-gray-900 text-gray-700 dark:text-gray-100"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-white dark:text-white">
        <Gauge className="w-6 h-6" /> Pressure
      </h2>
      <div className="flex items-center justify-center gap-x-1">
        <p className="text-5xl text-center font-bold text-white">{pressure}</p>
        <span className="text-base text-indigo-200 dark:text-white font-semibold">hPa</span>
      </div>
      <p className="text-sm text-center text-white dark:text-white font-medium">
        {pressureDescription}
      </p>
    </div>
  );
};
