"use client";

import { useForecastStore } from "@/store/forecastStore";
import { kelvinToCelsius } from "@/utils/misc";
import { Thermometer } from "lucide-react";

export const FeelsLike = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No FeelsLike data found.</div>;

  const { feels_like, temp_min, temp_max } = forecast.main;

  const getFeelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    return "Feels significantly warmer than actual temperature.";
  };

  const feelsLikeDescription = getFeelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
        bg-gradient-to-b from-blue-300 via-cyan-200 to-yellow-200 dark:from-black dark:via-gray-800 dark:to-red-500 text-gray-700 dark:text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-600 dark:text-blue-300">
        <Thermometer className="w-6 h-6" /> Feels Like
      </h2>
      <p className="text-5xl text-center font-bold mt-2 text-black dark:text-white">
        {kelvinToCelsius(feels_like)}°
      </p>
      <p className="text-sm text-center text-black dark:text-white font-medium">
        {feelsLikeDescription}
      </p>
    </div>
  );
};
