"use client";

import { useForecastStore } from "@/store/forecastStore";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from "@/utils/Icons";
import { kelvinToCelsius } from "@/utils/misc";
import { useMemo } from "react";
import moment from "moment";
import { Navigation } from "lucide-react";

export const Temperature = () => {
  const { currentForecast: forecast, loading } = useForecastStore();

  const { main, timezone = 0, name = "", weather = [] } = forecast || {};
  const { main: weatherMain = "", description = "" } = weather[0] || {};

  const weatherIcon = useMemo(() => {
    switch (weather[0]?.main) {
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
  }, [weatherMain]);

  const temp = kelvinToCelsius(main?.temp as number);
  const minTemp = kelvinToCelsius(main?.temp_min as number);
  const maxTemp = kelvinToCelsius(main?.temp_max as number);

  if (loading) return <div>Loading...</div>;

  if (!forecast || !weather) {
    return (
      <div className="p-6 border rounded-lg dark:bg-dark-grey shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="h-24 bg-gray-300 rounded w-full mb-6"></div>
          <div className="flex justify-between">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentDay = moment()
    .utcOffset(timezone / 60)
    .format("dddd");
  const localTime = moment()
    .utcOffset(timezone / 60)
    .format("HH:mm:ss");

  return (
    <div
      className="w-full col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 py-4 px-6 rounded-2xl shadow-lg 
      bg-gradient-to-br from-blue-400 via-blue-400 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 
      text-white dark:text-gray-200 flex flex-col justify-between"
    >
      <header className="flex justify-between items-center pb-4 border-b border-white/25">
        <span className="font-semibold text-xl text-white dark:text-white">{currentDay}</span>
        <span className="text-xl font-semibold text-white dark:text-white">
          {localTime}
        </span>
      </header>
      <main className="flex flex-col items-center py-6">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          {name}{" "}
          <Navigation className="w-6 h-6 text-blue-800 dark:text-blue-300" />
        </h2>
        <p className="text-9xl font-bold my-4">{temp}°</p>
        <div className="flex items-center gap-4">
          <span className="text-6xl">{weatherIcon}</span>
          <p className="capitalize text-2xl font-medium">{description}</p>
        </div>
      </main>
      <footer className="flex justify-between items-center pt-4 border-t border-white/25">
        <div className="flex items-center gap-x-2">
          <p className="text-lg">Low</p>
          <p className="text-2xl font-semibold">{minTemp}°</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-lg">High</p>
          <p className="text-2xl font-semibold">{maxTemp}°</p>
        </div>
      </footer>
    </div>
  );
};
