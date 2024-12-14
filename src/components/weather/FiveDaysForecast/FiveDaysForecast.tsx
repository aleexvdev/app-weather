"use client";

import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { kelvinToCelsius, unixToDay } from "@/utils/misc";
import { Calendar, Cloud, CloudDrizzle, CloudRain, CloudSun, Cloudy, Snowflake } from "lucide-react";

export const FiveDaysForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastStore();

  if (loading) return renderSkeleton();
  if (error || !dailyForecast || dailyForecast.length === 0) return renderNoData();

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
      weather: { main: string }[];
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
      main: dailyData[0].weather[0]?.main,
    };
  };

  const fiveDaysForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = dailyForecast.slice(i, i + 5);
    fiveDaysForecasts.push(processData(dailyData));
  }

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Drizzle":
        return <CloudDrizzle size={20} />;
      case "Rain":
        return <CloudRain size={20} />;
      case "Snow":
        return <Snowflake size={20} />;
      case "Clear":
        return <Cloud size={20} />;
      case "Clouds":
        return <Cloudy size={20} />;
      default:
        return <CloudSun size={20} />;
    }
  };

  return (
    <div
      className="w-full col-span-2 md:col-span-2 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg 
      bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 dark:from-stone-800 dark:to-stone-900"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold text-white dark:text-blue-100">
        <Calendar className="w-6 h-6" /> 5-Day Forecast
      </h2>
      <div className="mt-1">
        {fiveDaysForecasts.map((day, i) => {
          const dayText = i === 0 ? "Today" : day.day;
          return (
            <div
              key={i}
              className="py-2 flex justify-evenly gap-x-6 border-b-2 border-stone-500 dark:border-stone-700"
            >
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold w-16 text-white">{dayText}</p>
                <p className="text-sm text-white">{getWeatherIcon(day.main)}</p>
              </div>
              <div className="flex-1 flex items-center justify-between gap-4">
                <p className="font-medium text-sm text-white">{day.minTemp}°C</p>
                <div className="flex-1 w-full h-2 rounded-lg bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500"></div>
                <p className="font-medium text-sm text-white">{day.maxTemp}°C</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-2 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 dark:from-stone-800 dark:to-stone-900"
  >
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/3"></div>
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-2/3 mx-auto mt-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2 mx-auto"></div>
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/3"></div>
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-2/3 mx-auto mt-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2 mx-auto"></div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-2 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-2 shadow-lg 
      bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 dark:from-stone-800 dark:to-stone-900"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-600 dark:text-blue-300">
      <Calendar className="w-6 h-6" /> 5-Day Forecast
    </h2>
    <p className="text-center text-base text-black dark:text-white font-medium mt-4 flex items-center h-full">
      No data available. Check your connection or try again later.
    </p>
  </div>
);