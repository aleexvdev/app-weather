"use client";

import { useForecastStore } from '@/store/forecastStore';
import { Eye } from 'lucide-react';
import React from 'react'

export const Visibility = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;
  
  if (!forecast || !forecast.visibility) return <div>No visibility data found.</div>;

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <Eye className="w-6 h-6" /> Visibility
      </h2>
      <p className="py-2 text-4xl text-center font-semibold">{Math.round(visibility / 1000)} Km</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">{getVisibilityDescription(visibility)}</p>
    </div>
  );
}
