"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Droplets } from "lucide-react";

export const Humidity = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No humidity data found.</div>;

  const { humidity } = forecast.main;

  const getHumidityText = (humidity: number): string => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity < 50) return "Comfortable: Ideal for health and comfort";
    if (humidity < 70) return "Moderate: Sticky, may increase allergens";
    return "High: Uncomfortable, mold growth risk";
  };

  const humidityDescription = getHumidityText(humidity);

  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
        bg-gradient-to-b from-blue-200 to-blue-500 dark:from-gray-700 dark:to-blue-800 text-gray-700 dark:text-gray-100"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-800 dark:text-blue-200">
        <Droplets className="w-6 h-6" /> Humidity
      </h2>
      <p className="text-5xl text-center font-bold mt-2 text-black dark:text-white">{humidity}%</p>
      <p className="text-sm text-center text-black dark:text-white font-medium">
        {humidityDescription}
      </p>
    </div>
  );
};
