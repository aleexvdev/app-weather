"use client";

import React from "react";
import { Button } from "../ui/button";
import { CloudMoonRain, Github, MapPin } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useForecastStore } from "@/store/forecastStore";
import { useDailyForecastStore } from "@/store/dailyForecastStore";

export const Navbar = () => {

  const { fetchForecast } = useForecastStore();
  const { fetchDailyForecast } = useDailyForecastStore();

  const currentLocation = async () => {
    try {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return null;
      }
      const position: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });
      const { latitude, longitude } = position.coords;
      fetchForecast(latitude, longitude);
      fetchDailyForecast(latitude, longitude);

    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  }

  return (
    <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full py-6 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl flex items-center gap-x-2">
          <CloudMoonRain className="w-8 h-8 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-500 via-teal-600 to-green-600 bg-clip-text text-transparent font-bold">
            Weather.app
          </span>
        </h1>
        <div className="flex shrink-0 gap-2 sm:w-fit">
          <CommandMenu />
          <ThemeToggle />

          <Button
            variant="default"
            className="h-10 flex items-center gap-x-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:text-gray-200 dark:hover:bg-blue-700"
            onClick={currentLocation}
          >
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Current Location</span>
          </Button>
          <Link
            passHref
            href="https://github.com/aleexvdev/app-weather"
            prefetch={false}
            aria-label="Source Code"
            className="shrink-0"
            target="_blank"
          >
            <Button
              variant={"default"}
              className="h-10 hidden md:block lg:flex items-center gap-x-2"
            >
              <Github className="w-4 h-4" />
              <span className="font-medium hidden lg:block">Source Code</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
