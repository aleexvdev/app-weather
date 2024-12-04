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

  console.log(dailyForecast);

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
        bg-gradient-to-b from-teal-100 to-teal-200 dark:from-teal-700 dark:to-teal-800"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-stone-700 dark:text-gray-200">
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
                className={`flex flex-col items-center justify-between gap-1 p-1 rounded-lg shadow-md bg-gradient-to-b  from-amber-300 to-amber-400 dark:from-amber-200 dark:to-amber-400 hover:scale-105 transition-all m-1 cursor-grab`}
                style={{
                  flex: "0 0 calc(33.33% - 1rem)",
                  minWidth: "calc(33.33% - 1rem)",
                }}
              >
                <p className="text-sm text-black dark:text-black font-medium">
                  {moment(dt_txt).format("ddd hh:mm A")}
                </p>
                <div className="flex items-center justify-center gap-x-2">
                  <div className="text-5xl text-black dark:text-black">{icon}</div>
                  <p className="text-lg font-bold text-black dark:text-black">
                    {kelvinToCelsius(main.temp)}°C
                  </p>
                </div>
                <p className="text-sm text-black capitalize w-full text-center font-medium">
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
