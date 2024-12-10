"use client";

import { Progress } from "@/components/ui/progress";
import { useAirPollutionStore } from "@/store/airPollutionStore";
import { airQulaityIndexText } from "@/utils/misc";
import { ThermometerSun } from "lucide-react";

export const AirPollution = () => {
  const { airPollution, loading, error } = useAirPollutionStore();

  if (loading || error) return renderSkeleton();
  if (!airPollution) return renderNoData();

  const airQualityIndex = airPollution.list[0]?.main?.aqi * 10 || 0;
  const filteredIndex = airQulaityIndexText.find((item) => item.rating === airQualityIndex);
  const airQualityDescription = filteredIndex?.description || "unknown";
  const airQualityColor = filteredIndex?.color || "bg-gray-300";

  return (
    <div
      className={`w-full col-span-1 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
      bg-gradient-to-b from-blue-200 to-blue-300 dark:from-stone-800 dark:to-stone-900`}
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-800 dark:text-blue-300">
        <ThermometerSun className="w-6 h-6" /> Air Pollution
      </h2>
      <Progress
        value={airQualityIndex}
        max={100}
        aria-label="Air Quality Index"
        className={`progress ${airQualityColor}`}
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
          Current AQI:{" "}
          <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">
            {airQualityIndex}
          </span>
        </p>
        <span
          className={`px-3 py-1 text-sm rounded-full font-semibold text-black dark:text-white ${airQualityColor}`}
        >
          {airQualityDescription}
        </span>
      </div>
      <p className="text-sm text-center mt-1 text-black dark:text-white font-medium">
        The air quality index represents the condition of the air in your area.
      </p>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-1 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
      bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800"
  >
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-1/3"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-full mt-2"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-1/4 mt-2"></div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-1 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
      bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-100"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
      <ThermometerSun className="w-6 h-6" /> Air Pollution
    </h2>
    <p className="text-center text-lg text-gray-800 dark:text-gray-300 font-medium mt-4">
      No air pollution data available. Please try again later.
    </p>
  </div>
);
