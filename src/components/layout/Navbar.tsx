"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { CloudMoonRain, Github, LocateFixed, Menu, X } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useForecastStore } from "@/store/forecastStore";
import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { GradeConfig } from "./GradeConfig";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { fetchForecast } = useForecastStore();
  const { fetchDailyForecast } = useDailyForecastStore();

  const currentLocation = async () => {
    try {
      setIsOpen(false);
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return null;
      }
      const position: GeolocationPosition = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        }
      );
      const { latitude, longitude } = position.coords;
      fetchForecast(latitude, longitude);
      fetchDailyForecast(latitude, longitude);
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  };

  return (
    <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full py-6 flex items-center justify-between relative">
        <h1 className="text-lg md:text-2xl flex items-center gap-x-2">
          <CloudMoonRain className="w-8 h-8 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-500 via-teal-600 to-green-600 bg-clip-text text-transparent font-bold">
            Weather.app
          </span>
        </h1>
        <div className="flex gap-2 items-center">
          <CommandMenu oncloseList={() => setIsOpen(false)} />
          <div className="hidden md:flex items-center gap-x-2">
            <ThemeToggle close={() => setIsOpen(false)} />
            <GradeConfig close={() => setIsOpen(false)} />
            <Button
              variant="default"
              className="h-10 hidden md:flex items-center gap-x-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:text-gray-200 dark:hover:bg-blue-700"
              onClick={currentLocation}
            >
              <LocateFixed className="w-5 h-5" />
              <span className="font-medium">Current Location</span>
            </Button>
            <Link
              passHref
              href="https://github.com/aleexvdev/app-weather"
              prefetch={false}
              aria-label="Source Code"
              target="_blank"
              className="hidden md:block"
            >
              <Button
                variant={"default"}
                className="flex items-center gap-x-2 h-10"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium hidden lg:block">Source Code</span>
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              variant="default"
              className="h-10 flex items-center bg-blue-600 text-white hover:bg-blue-700 dark:bg-amber-800 dark:text-gray-200 dark:hover:bg-amber-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            {isOpen && (
              <div className="absolute top-16 right-0 w-max mt-2 bg-[#dfdfdf] dark:bg-[#3d3d3d] rounded-lg shadow-lg z-50">
                <div className="w-max flex flex-col items-start p-2 gap-y-4">
                  <ThemeToggle close={() => setIsOpen(false)} />
                  <GradeConfig close={() => setIsOpen(false)} />
                  <Button
                    variant="default"
                    className="w-full h-10 flex items-center bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:text-gray-200 dark:hover:bg-blue-700"
                    onClick={currentLocation}
                  >
                    <LocateFixed className="w-5 h-5" />
                    <span className="font-medium">Current Location</span>
                  </Button>
                  <Link
                    passHref
                    href="https://github.com/aleexvdev/app-weather"
                    prefetch={false}
                    aria-label="Source Code"
                    target="_blank"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={"default"}
                      className="w-full flex items-center gap-x-2 h-10"
                    >
                      <Github className="w-5 h-5" />
                      <span className="font-medium">Source Code</span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
