"use client";

import { useForecastStore } from "@/store/forecastStore";
import { kelvinToCelsius } from "@/utils/misc";
import { Thermometer } from "lucide-react";

export const FeelsLike = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No FeelsLike data found.</div>;

  const { feels_like, temp_min, temp_max } = forecast.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;
    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }
    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <Thermometer className="w-6 h-6" /> Feels Like
      </h2>
      <p className="py-2 text-4xl text-center font-semibold">{kelvinToCelsius(feels_like)}°</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">{feelsLikeDescription}</p>
    </div>
  );
};
