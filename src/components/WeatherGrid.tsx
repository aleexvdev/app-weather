"use client";

// import dynamic from "next/dynamic";
import { AirPollution } from "./weather/AirPollution/AirPollution";
import { DailyForecast } from "./weather/DailyForecast/DailyForecast";
import { FeelsLike } from "./weather/FeelsLike/FeelsLike";
import { FiveDaysForecast } from "./weather/FiveDaysForecast/FiveDaysForecast";
import { Humidity } from "./weather/Humidity/Humidity";
import { OtherCities } from "./weather/OtherCities/OtherCities";
import { Population } from "./weather/Population/Population";
import { Precipitation } from "./weather/Precipitation/Precipitation";
import { Pressure } from "./weather/Pressure/Pressure";
import { Sunrise } from "./weather/Sunrise/Sunrise";
import { Sunset } from "./weather/Sunset/Sunset";
import { Temperature } from "./weather/Temperature/Temperature";
import { UvIndex } from "./weather/UvIndex/UvIndex";
import { Visibility } from "./weather/Visibility/Visibility";
import { Wind } from "./weather/Wind/Wind";
import { DynamicMapbox } from "./weather/Mapbox/DynamicMapbox";

// interface DynamicMapboxProps {}

/* const DynamicMapbox = dynamic<DynamicMapboxProps>(() => 
  import('@/components/weather/Mapbox/DynamicMapbox').then((mod) => mod.DynamicMapbox),
{
  ssr: false,
  loading: () => <p>Loading map...</p>
}); */

export const WeatherGrid = () => {
  return (
    <div className="mt-2 flex items-center w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-2 w-full h-full gap-4">
        <Temperature />
        <AirPollution />
        <Sunset />
        <Sunrise />
        <DailyForecast />
        <UvIndex />
        <Wind />
        <FeelsLike />
        <Humidity />
        <Pressure />
        <Precipitation />
        <Visibility />
        <Population />
        <FiveDaysForecast />
        {/* <div className="w-full col-span-1 md:col-span-2 lg:col-span-3 min-h-60 md:min-h-full rounded-lg shadow-lg">
          
        </div> */}
        <DynamicMapbox />
        <OtherCities />
      </div>
    </div>
  )
}
