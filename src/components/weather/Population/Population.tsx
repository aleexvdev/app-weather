"use client";

import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { formatNumber } from "@/utils/misc";
import { UsersRound } from "lucide-react";
import React from "react";

export const Population = () => {
  const { city, loading } = useDailyForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!city) return <div>No Population data found.</div>;

  const formatPopulation = formatNumber(city.population as number);
  const populationText = (city.population) ? formatPopulation.toLocaleString() : "?";

  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg text-gray-700 dark:text-gray-100 
        bg-gradient-to-b from-green-400 via-green-600 to-green-800 dark:from-green-600 dark:via-green-700 dark:to-green-800"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-green-900 dark:text-green-100">
        <UsersRound className="w-6 h-6" /> Population
      </h2>
      <p className="text-5xl text-center font-bold text-white">
        {populationText}
      </p>
      <p className="text-sm text-center text-white font-medium">
        Latest UN population data for {city.name}.
      </p>
    </div>
  );
};
