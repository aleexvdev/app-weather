"use client";

import { useUvIndexStore } from "@/store/uvIndexStore";
import { Sun } from "lucide-react";
import React from "react";
import { UvProgress } from "./UvProgress";

export const UvIndex = () => {
  const { uvIndex, loading } = useUvIndexStore();

  if (loading) return <div>Loading...</div>;

  if (!uvIndex) return <div>No UV Index data found.</div>;

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
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-blue-200 to-blue-300 dark:from-stone-800 dark:to-stone-900"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-800 dark:text-blue-300">
        <Sun className="w-6 h-6" /> Uv Index
      </h2>
      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-semibold">{uvIndexMax}</p>
        <span className="text-xl font-semibold">{uvIndexCategory(uvIndexMax).text}</span>
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
