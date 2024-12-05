"use client";

import { useForecastStore } from "@/store/forecastStore";
import { Gauge } from "lucide-react";

export const Pressure = () => {

  const { currentForecast: forecast, loading } = useForecastStore();

  if (loading) return <div>Loading...</div>;

  if (!forecast || !forecast.main) return <div>No pressure data found.</div>;

  const { pressure } = forecast.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return (
    <div
      className="w-full col-span-1 md:col-span-1 lg:col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
    bg-gradient-to-b from-stone-700 to-stone-900 dark:from-gray-900 dark:to-black text-gray-300"
    >
      <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-200 dark:text-white">
        <Gauge className="w-6 h-6" /> Pressure
      </h2>
      <p className="py-0 mt-2 text-3xl text-center font-semibold">{pressure} hPa</p>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 font-medium">{getPressureDescription(pressure)}</p>
    </div>
  );

}
