"use client";

import { useDailyForecastStore } from '@/store/dailyForecastStore';
import { formatNumber } from '@/utils/misc';
import { UsersRound } from 'lucide-react';
import React from 'react'

export const Population = () => {

  const { city, loading } = useDailyForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!city) return <div>No Population data found.</div>;

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <UsersRound className="w-6 h-6" /> Population
      </h2>
      <p className="py-2 text-4xl text-center font-semibold">{formatNumber(city.population)}</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">Latest UN population data for {city.name}.</p>
    </div>
  );
}
