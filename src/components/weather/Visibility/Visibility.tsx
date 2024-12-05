"use client";

import { useForecastStore } from '@/store/forecastStore';
import { Eye } from 'lucide-react';
import React from 'react'

export const Visibility = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;
  
  if (!forecast || !forecast.visibility) return <div>No visibility data found.</div>;

  const { visibility } = forecast;

  const visibilityInKm = Math.round(visibility / 1000);

  const getVisibilityDescription = (visibilityKm: number): string => {
    if (visibilityKm > 10) return "Excellent: Clear and vast view.";
    if (visibilityKm > 5) return "Good: Easily navigable.";
    if (visibilityKm > 2) return "Moderate: Some limitations.";
    return "Poor: Restricted and unclear.";
  };

  const visibilityDescription = getVisibilityDescription(visibilityInKm);

  const visibilityBgColor = visibilityInKm > 10 ? "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-600 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900"
    : visibilityInKm > 5 ? "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-800"
    : visibilityInKm > 2 ? "bg-gradient-to-b from-orange-200 via-orange-500 to-orange-800 dark:from-orange-600 dark:via-orange-700 dark:to-red-800"
    : "bg-gradient-to-b from-red-200 via-red-500 to-red-800 dark:from-red-700 dark:to-red-900";
  
  const visibilityTitleColor = visibilityInKm > 10 ? "text-blue-800 dark:text-blue-200"
    : visibilityInKm > 5 ? "text-black dark:text-white"
    : visibilityInKm > 2 ? "text-orange-900 dark:text-orange-100"
    : "text-red-800 dark:text-red-200";

  const visibilityDescriptionColor = visibilityInKm > 10 ? "text-blue-100 dark:text-blue-200"
    : visibilityInKm > 5 ? "text-black dark:text-white"
    : visibilityInKm > 2 ? "text-orange-100 dark:text-orange-200"
    : "text-red-100 dark:text-red-100";

  return (
    <div
      className={`w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
        text-gray-700 dark:text-gray-100 ${visibilityBgColor}`}
    >
      <h2 className={`flex items-center gap-2 text-xl font-semibold ${visibilityTitleColor}`}>
        <Eye className="w-6 h-6" /> Visibility
      </h2>
      <div className={`flex items-center justify-center gap-x-1 ${visibilityDescriptionColor}`}>
        <p className="text-5xl text-center font-bold">{visibilityInKm}</p>
        <span className="text-base font-semibold">km</span>
      </div>
      <p className={`text-sm text-center font-medium ${visibilityDescriptionColor}`}>
        {visibilityDescription}
      </p>
    </div>
  );
}
