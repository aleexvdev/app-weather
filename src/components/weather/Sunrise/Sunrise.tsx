"use client";

import { useForecastStore } from "@/store/forecastStore";
import { unixToTime } from "@/utils/misc";
import { SunriseIcon } from "lucide-react";
import React from "react";

export const Sunrise = () => {
  const { currentForecast: forecast, loading, error } = useForecastStore();

  if (loading || error) return renderSkeleton();
  if (!forecast?.sys?.sunrise) return renderNoData();

  const sunriseTime = unixToTime(forecast.sys.sunrise, forecast.timezone || 0);
  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between
      bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg text-white"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 font-semibold">
          <SunriseIcon className="w-6 h-6" />
          <span className="text-2xl">Sunrise</span>
        </div>
        <p className="mt-2 text-4xl font-extrabold">{sunriseTime || "N/A"}</p>
      </div>
      <div className="w-full h-2 bg-white rounded-full relative overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-black to-purple-600"
          style={{ width: "50%" }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-center">
        Start your day with the first light of the sun!
      </p>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between
    bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg text-white animate-pulse"
  >
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-start gap-2">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="mt-4 h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full relative overflow-hidden"></div>
    <div className="mt-2 h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between items-center
    bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg text-white"
  >
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 font-semibold">
        <SunriseIcon className="w-6 h-6" />
        <span className="text-2xl">Sunrise</span>
      </div>
    </div>
    <div className="flex flex-col items-center text-center">
      <p className="text-lg font-semibold">No sunrise data available.</p>
      <span className="text-sm">Please check back later.</span>
    </div>
  </div>
);
