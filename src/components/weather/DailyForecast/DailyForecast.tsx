"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/utils/Icons";
import { kelvinToCelsius } from "@/utils/misc";
import { CalendarDays } from "lucide-react";
import moment from "moment";

export const DailyForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!dailyForecast || dailyForecast.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold">No Data Available!</h1>
      </div>
    );
  }

  const getWeatherIcon = (main: string) => {
    switch (main) {
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
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-2 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-4 shadow-lg 
        bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-100 dark:text-purple-200">
        <CalendarDays className="w-6 h-6" /> Daily Forecast
      </h2>
      <Carousel className="relative">
        <CarouselContent className="flex gap-4">
          {dailyForecast.map((forecast) => {
            const { dt_txt, main, weather } = forecast;
            const weatherMain = weather[0]?.main || "Clear";
            const icon = getWeatherIcon(weatherMain);
            return (
              <CarouselItem
                key={dt_txt}
                className={`flex flex-col items-center justify-between gap-1 p-1 rounded-lg shadow-xl 
                  bg-gradient-to-b from-blue-500 via-blue-600 to-purple-500 dark:from-blue-400 dark:via-purple-500 dark:to-purple-800 
                  hover:scale-105 transition-all m-1 cursor-grab`}
                style={{
                  flex: "0 0 calc(33.33% - 1rem)",
                  minWidth: "calc(33.33% - 1rem)",
                }}
              >
                <p className="text-sm text-white dark:text-black font-medium">
                  {moment(dt_txt).format("ddd hh:mm A")}
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
