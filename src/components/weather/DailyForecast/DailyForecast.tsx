"use client";

import React from 'react'

export const DailyForecast = () => {

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className='w-full col-span-2 row-span-1'>
      dsad
    </div>
  )
}
