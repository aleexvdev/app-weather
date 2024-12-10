"use client";

import { useUvIndexStore } from "@/store/uvIndexStore";
import { Sun } from "lucide-react";
import React from "react";
import { UvProgress } from "./UvProgress";

export const UvIndex = () => {
  const { uvIndex, loading, error } = useUvIndexStore();

  if (loading || error) return renderSkeleton();
  if (!uvIndex) return renderNoData();

  const uvIndexMax = Number(uvIndex.toFixed(0));

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    } else {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
  };

  const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <div
      className="w-full col-span-1 md:col-span-2 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
      bg-gradient-to-b from-blue-200 to-blue-300 dark:from-stone-800 dark:to-stone-900"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-800 dark:text-blue-300">
        <Sun className="w-6 h-6" /> Uv Index
      </h2>
      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-semibold">{uvIndexMax}</p>
        <span className="text-xl font-semibold">
          {uvIndexCategory(uvIndexMax).text}
        </span>
      </div>
      <div className="w-full">
        <UvProgress value={marginLeftPercentage} />
      </div>
      <p className="text-base text-center mt-1 text-black dark:text-white font-medium">
        {uvIndexCategory(uvIndexMax).protection}
      </p>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-1 md:col-span-2 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
    bg-gradient-to-b from-blue-200 to-blue-300 dark:from-stone-800 dark:to-stone-900"
  >
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-full"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-full mt-2"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse w-1/2 mt-2"></div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-1 md:col-span-2 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
    bg-gradient-to-b from-blue-200 to-blue-300 dark:from-stone-800 dark:to-stone-900 text-gray-700 dark:text-gray-100"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
      <Sun className="w-6 h-6" /> UV Index
    </h2>
    <p className="text-center text-sm text-gray-800 dark:text-gray-300 font-medium mt-4">
      No UV Index data available. Please try again later.
    </p>
  </div>
);