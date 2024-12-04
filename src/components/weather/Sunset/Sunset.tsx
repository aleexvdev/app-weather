"use client";

import { useForecastStore } from '@/store/forecastStore';
import { unixToTime } from '@/utils/misc';
import { SunsetIcon } from 'lucide-react';
import React from 'react'

export const Sunset = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.sys) return <div>No sunset data found.</div>;

  const sunsetTime = unixToTime(forecast.sys.sunset, forecast.timezone || 0);
  
  return (
    <div
      className="w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between
      bg-gradient-to-b from-orange-400 to-pink-600 shadow-xl text-white"
    >
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center justify-start gap-2 font-semibold">
          <SunsetIcon className='w-6 h-6' />
          <span className="text-2xl">Sunset</span>
        </div>
        <p className="mt-2 text-4xl font-extrabold">{sunsetTime || "N/A"}</p>
      </div>
      <div className="w-full h-2 bg-white rounded-full relative overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-yellow-400 to-orange-600"
          style={{ width: "50%" }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-center">
        Witness the beauty of the setting sun!
      </p>
    </div>
  );
}
