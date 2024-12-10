"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Droplets } from "lucide-react";

export const Humidity = () => {
  const { currentForecast: forecast, loading, error } = useForecastStore();

  if (loading) return renderSkeleton();
  if (error || !forecast || !forecast.main) return renderNoData();

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

const renderSkeleton = () => (
  <div
    className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-blue-200 to-blue-500 dark:from-gray-700 dark:to-blue-800"
  >
    <div className="h-6 bg-gray-200 dark:bg-gray-500 rounded-md animate-pulse w-1/3"></div>
    <div className="h-12 bg-gray-200 dark:bg-gray-500 rounded-md animate-pulse w-2/3 mx-auto mt-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded-md animate-pulse w-1/2 mx-auto"></div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-blue-200 to-blue-500 dark:from-gray-700 dark:to-blue-800 text-gray-700 dark:text-gray-100"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-800 dark:text-blue-200">
      <Droplets className="w-6 h-6" /> Humidity
    </h2>
    <p className="text-center text-sm text-black dark:text-white font-medium mt-4">
      No humidity data available. Please check your connection or try again later.
    </p>
  </div>
);
