"use client";

import { useForecastStore } from "@/store/forecastStore";
import { clearSky, cloudy, drizzleIcon, rain, snow, navigation } from "@/utils/Icons";
import { kelvinToCelsius } from "@/utils/misc";
// import { Calendar, Droplets, MapPin, Wind } from "lucide-react";
import { useMemo } from "react";
import moment from "moment";

export const Temperature = () => {
  const { currentForecast: forecast, loading } = useForecastStore();
  
  const { main, timezone = 0, name = "", weather = [] } = forecast || {};
  const { main: weatherMain = "", description = "" } = weather[0] || {};

  console.log("forecast", forecast);

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

  /* const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    // Actualizar hora local cada segundo
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      setLocalTime(localMoment.format("HH:mm:ss"));
      setCurrentDay(localMoment.format("dddd"));
    }, 50000);

    return () => clearInterval(interval);
  }, [timezone]); */

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

  const currentDay = moment().utcOffset(timezone / 60).format("dddd");
  const localTime = moment().utcOffset(timezone / 60).format("HH:mm:ss");

  return (
    <div
      className="w-full col-span-2 p-6 border rounded-lg flex flex-col justify-between 
        dark:bg-dark-grey shadow-md dark:shadow-none bg-background text-gray-800 dark:text-white"
    >
      <header className="flex justify-between items-center pb-4 border-b">
        <span className="font-medium text-lg">{currentDay}</span>
        <span className="font-mono text-lg">{localTime}</span>
      </header>
      <main className="text-center py-6">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          {name} <span>{navigation}</span>
        </h2>
        <p className="text-8xl font-extrabold my-6">{temp}°</p>
        <div className="flex items-center space-x-2">
          <span className="text-5xl">{weatherIcon}</span>
          <p className="capitalize text-xl">{description}</p>
        </div>
      </main>
      <footer className="flex justify-between items-center pt-4 border-t">
        <p className="text-lg">Low: {minTemp}°</p>
        <p className="text-lg">High: {maxTemp}°</p>
      </footer>
    </div>
  );
};
