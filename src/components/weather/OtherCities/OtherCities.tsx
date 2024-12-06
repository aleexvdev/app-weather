"use client";

import { useLocationStore } from "@/store/locationStore";
import { defaultStates } from "@/utils/data";
import React from "react";

export const OtherCities = () => {

  const { setLocation } = useLocationStore();

  return (
    <div className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-2 rounded-lg flex flex-col justify-between gap-4 shadow-lg
      bg-gradient-to-b from-stone-100 via-stone-400 to-stone-500 dark:from-black dark:via-slate-700 dark:to-gray-900 text-gray-300
    ">
      <h2 className="flex items-center justify-start text-base font-semibold text-black dark:text-white">
        Other large cities
      </h2>
      <div className="flex flex-col gap-y-2 justify-between">
        {
          defaultStates.map((state, i) => (
            <button
              key={i}
              className="flex items-center justify-start gap-2 rounded-lg bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 
              dark:from-gray-800 dark:to-black text-gray-300 hover:scale-105 transition-all
              px-4 py-2 shadow-xl cursor-pointer"
              onClick={() => setLocation(state.lat, state.lon, state.name)}
            >
              <span className="text-sm font-semibold text-black dark:text-white">{state.country}</span>
              <span className="text-sm font-medium text-black dark:text-white">{state.name}</span>
            </button>
          ))
        }
      </div>
    </div>
  );
};
