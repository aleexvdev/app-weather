"use client";

import { useForecastStore } from "@/store/forecastStore";
import { kelvinToCelsius } from "@/utils/misc";
import { Droplets } from "lucide-react";

export const Humidity = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No humidity data found.</div>;

  const { humidity } = forecast.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <Droplets className="w-6 h-6" /> Humidity
      </h2>
      <p className="py-2 text-4xl text-center font-semibold">{kelvinToCelsius(humidity)}°</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">{getHumidityText(humidity)}</p>
    </div>
  );
};
