"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Wind as WindIcon } from "lucide-react";
import React from "react";

export const Wind = () => {
  const { currentForecast, loading, error } = useForecastStore();

  if (loading) return renderSkeleton();
  if (!currentForecast || error) return renderNoData();

  const { wind } = currentForecast;

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
      bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-300 dark:text-white">
        <WindIcon className="w-6 h-6" /> Wind
      </h2>
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <img
            src="/compass_body.svg"
            alt="Compass body"
            width={120}
            height={120}
            className="opacity-100 dark:opacity-80"
          />
          <img
            src="/compass_arrow.svg"
            alt="Compass arrow"
            className="absolute top-0.5 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out invert"
            style={{
              transform: `rotate(${wind?.deg}deg)`,
            }}
            width={12}
            height={12}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-sm
            dark:text-white font-semibold"
        >
          {Math.round(wind?.speed as number)} m/s
        </p>
      </div>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300 animate-pulse"
  >
    <div className="h-6 bg-gray-500 dark:bg-gray-700 rounded w-1/3"></div>
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 bg-gray-500 dark:bg-gray-700 rounded-full"></div>
        <div
          className="absolute w-10 h-2 bg-gray-500 dark:bg-gray-700 rounded transform origin-bottom"
          style={{ transform: "rotate(45deg)" }}
        ></div>
      </div>
      <div className="h-4 bg-gray-500 dark:bg-gray-700 rounded w-16 mt-2"></div>
    </div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col items-center gap-4 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
  >
    <h2 className="w-full flex items-center justify-start gap-2 text-xl font-semibold text-blue-300 dark:text-white">
      <WindIcon className="w-6 h-6" /> Wind
    </h2>
    <div className="w-28 h-28 bg-gray-500 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
      <WindIcon className="w-10 h-10 text-gray-400" />
    </div>
  </div>
);
