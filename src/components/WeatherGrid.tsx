"use client";

import { AirPollution } from "./weather/AirPollution/AirPollution";
import { DailyForecast } from "./weather/DailyForecast/DailyForecast";
import { Sunrise } from "./weather/Sunrise/Sunrise";
import { Sunset } from "./weather/Sunset/Sunset";
import { Temperature } from "./weather/Temperature/Temperature";

export const WeatherGrid = () => {
  return (
    <div className="mt-2 flex items-center w-full h-full">
      <div className="grid grid-cols-6 grid-rows-5 w-full h-full gap-4">
        <Temperature />
        <AirPollution />
        <Sunset />
        <Sunrise />
        <DailyForecast />
      </div>
    </div>
  )
}
