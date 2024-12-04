"use client";

import { useForecastStore } from '@/store/forecastStore';
import { unixToTime } from '@/utils/misc';
import { SunriseIcon } from 'lucide-react';
import React from 'react'

export const Sunrise = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.sys) return <div className="flex justify-center items-center text-gray-500">No sunrise data found.</div>;

  const sunriseTime = unixToTime(forecast.sys.sunrise, forecast.timezone || 0);
  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between
      bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg text-white"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 font-semibold">
          <SunriseIcon className='w-6 h-6' />
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
}
