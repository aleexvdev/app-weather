"use client";

import { useForecastStore } from "@/store/forecastStore";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/utils/Icons";
import { kelvinToCelsius, kelvinToFahrenheit } from "@/utils/misc";
import { useMemo } from "react";
import moment from "moment";
import { Navigation } from "lucide-react";
import { useGradeStore } from "@/store/gradeStore";

export const Temperature = () => {

  const { grade } = useGradeStore();
  const { currentForecast: forecast, loading, error } = useForecastStore();

  const {
    main: weatherMain,
    timezone = 0,
    name = "",
    weather = [],
  } = forecast || {};
  const { description = "" } = weather[0] || {};

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
  }, [weather]);

  const temp = grade === 'C' ? kelvinToCelsius(weatherMain?.temp as number) : kelvinToFahrenheit(weatherMain?.temp as number);
  const minTemp = grade === 'C' ? kelvinToCelsius(weatherMain?.temp_min as number) : kelvinToFahrenheit(weatherMain?.temp_min as number);
  const maxTemp = grade === 'C' ? kelvinToCelsius(weatherMain?.temp_max as number) : kelvinToFahrenheit(weatherMain?.temp_max as number);

  if (loading || !forecast || !weather || error) {
    return (
      <div
        className="w-full col-span-2 md:col-span-2 lg:col-span-2 row-span-2 md:row-span-2 lg:row-span-2 py-4 px-6 rounded-2xl shadow-lg 
        bg-gradient-to-br from-blue-400 via-blue-400 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 
        text-white dark:text-gray-200 flex flex-col justify-between animate-pulse"
      >
        <header className="flex justify-between items-center pb-4 border-b border-white/25">
          <span className="w-20 h-6 bg-gray-300 rounded"></span>
          <span className="w-20 h-6 bg-gray-300 rounded"></span>
        </header>
        <main className="flex flex-col items-center py-6">
          <div className="w-32 h-8 bg-gray-300 rounded mb-6"></div>
          <div className="w-24 h-24 bg-gray-300 rounded-full my-4"></div>
          <div className="w-48 h-6 bg-gray-300 rounded"></div>
        </main>
        <footer className="flex justify-between items-center pt-4 border-t border-white/25">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-6 bg-gray-300 rounded"></div>
            <div className="w-8 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-6 bg-gray-300 rounded"></div>
            <div className="w-8 h-6 bg-gray-300 rounded"></div>
          </div>
        </footer>
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
      className="w-full col-span-2 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2 py-4 px-6 rounded-2xl shadow-lg 
      bg-gradient-to-br from-blue-400 via-blue-400 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 
      text-white dark:text-gray-200 flex flex-col justify-between"
    >
      <header className="flex justify-between items-center pb-4 border-b border-white/25">
        <span className="font-semibold text-xl text-white dark:text-white">
          {currentDay}
        </span>
        <span className="text-xl font-semibold text-white dark:text-white">
          {localTime}
        </span>
      </header>
      <main className="flex flex-col items-center py-6">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          {name}{" "}
          <Navigation className="w-6 h-6 text-blue-800 dark:text-blue-300" />
        </h2>
        <p className="text-9xl font-bold my-4">{temp}°{grade === 'C' ? 'C' : 'F'}</p>
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
