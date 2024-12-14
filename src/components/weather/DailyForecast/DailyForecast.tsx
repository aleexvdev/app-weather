"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { useForecastStore } from "@/store/forecastStore";
import {
  CalendarDays,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Cloudy,
  Snowflake,
} from "lucide-react";
import { kelvinToCelsius } from "@/utils/misc";
import moment from "moment";

export const DailyForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastStore();
  const { currentForecast } = useForecastStore();

  if (loading || error) return renderSkeleton();
  if (!dailyForecast || dailyForecast.length === 0) return renderNoData();

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

  const currentDay = currentForecast?.dt
    ? moment.unix(currentForecast.dt).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const filteredForecast = dailyForecast?.filter(
    (forecast) => moment(forecast.dt_txt).format("YYYY-MM-DD") === currentDay
  );

  if (filteredForecast?.length === 0) return renderNoData();

  return (
    <div
      className="w-full col-span-2 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg 
        bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-100 dark:text-purple-200">
        <CalendarDays className="w-6 h-6" /> Daily Forecast
      </h2>
      <Carousel className="relative">
        <CarouselContent className="flex justify-center gap-4">
          {filteredForecast?.map((forecast) => {
            const { dt_txt, main, weather } = forecast;
            const weatherMain = weather[0]?.main || "Clear";
            const icon = getWeatherIcon(weatherMain);
            return (
              <CarouselItem
                key={dt_txt}
                className={`h-full min-h-28 flex flex-col items-center justify-between gap-1 py-1 px-2 rounded-lg shadow-xl 
                  bg-gradient-to-b from-blue-500 via-blue-600 to-purple-500 dark:from-blue-400 dark:via-purple-500 dark:to-purple-800 
                  hover:scale-105 transition-all m-1 cursor-grab`}
                style={{
                  flex: "0 0 calc(33.33% - 1rem)",
                  minWidth: "calc(33.33% - 1rem)",
                }}
              >
                <p className="text-sm text-white dark:text-black font-semibold">
                  {moment(dt_txt).format("hh:mm A")}
                </p>
                <div className="flex items-center justify-center gap-x-1">
                  <div className="text-5xl text-white dark:text-black">
                    {icon}
                  </div>
                  <p className="text-xl font-bold text-white dark:text-black">
                    {kelvinToCelsius(main.temp)}°C
                  </p>
                </div>
                <p className="text-sm text-gray-100 dark:text-black capitalize w-full text-center font-medium">
                  {weather[0]?.description || "No description"}
                </p>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const renderSkeleton = () => (
  <div
    className="w-full col-span-2 md:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg 
      bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300 animate-pulse"
  >
    <h2 className="flex items-center gap-2 text-xl font-semibold bg-gray-700 h-6 w-48 rounded"></h2>
    <div className="h-full flex items-center justify-center">
      <div className="h-12 w-full bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

const renderNoData = () => (
  <div
    className="w-full col-span-2 md:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg 
      bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
  >
    <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-100 dark:text-purple-200">
      <CalendarDays className="w-6 h-6" /> Daily Forecast
    </h2>
    <div className="h-full flex items-center justify-center">
      <div
        className="flex items-center justify-center gap-1 py-1 px-2 rounded-lg shadow-xl 
            bg-gradient-to-b from-blue-500 via-blue-600 to-purple-500 dark:from-blue-400 dark:via-purple-500 dark:to-purple-800 
            hover:scale-105 transition-all m-1 min-h-12 w-full"
      >
        <p className="text-base text-white dark:text-black font-semibold">
          No data available
        </p>
      </div>
    </div>
  </div>
);