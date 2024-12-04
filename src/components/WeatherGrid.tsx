"use client";

import { Temperature } from "./weather/Temperature/Temperature";

export const WeatherGrid = () => {
  return (
    <div className="mt-2 flex items-center w-full h-full">
      <div className="grid grid-cols-8 grid-rows-5 w-full h-full">
        <Temperature />
      </div>
    </div>
  )
}
