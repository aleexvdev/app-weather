"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Wind as WindIcon } from "lucide-react";
import React from "react";

export const Wind = () => {
  const { currentForecast, loading, error } = useForecastStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!currentForecast) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold">No Data Available!</h1>
      </div>
    );
  }

  const { wind } = currentForecast;

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
      bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <WindIcon className="w-6 h-6" /> Wind
      </h2>
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <img
            src="/compass_body.svg"
            alt="Compass body"
            width={120}
            height={120}
            className="opacity-80"
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
