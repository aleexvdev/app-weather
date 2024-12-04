"use client";

import { Progress } from "@/components/ui/progress";
import { useAirPollutionStore } from "@/store/airPollutionStore";
import { thermo } from "@/utils/Icons";
import { airQulaityIndexText } from "@/utils/misc";

export const AirPollution = () => {
  const { airPollution, loading } = useAirPollutionStore();

  if (loading) return <div>Loading...</div>;

  if (!airPollution) return <div>No air pollution data found.</div>;

  const airQualityIndex = airPollution.list[0]?.main?.aqi * 10 || 0;
  const filteredIndex = airQulaityIndexText.find((item) => item.rating === airQualityIndex);
  const airQualityDescription = filteredIndex?.description || "unknown";
  const airQualityColor = "bg-gray-300";

  return (
    <div
      className={`w-full col-span-3 row-span-1 p-6 border rounded-lg flex flex-col justify-between 
      dark:bg-dark-grey shadow-md dark:shadow-none bg-background text-gray-800 dark:text-white`}
    >
      <h2 className="flex items-center gap-2 font-medium text-lg">
        {thermo}Air Pollution
      </h2>
      <Progress
        value={airQualityIndex}
        max={100}
        aria-label="Air Quality Index"
        className={`progress ${airQualityColor}`}
      />
      <p className="text-sm mt-2">
        <span className="font-medium">Air quality is {airQualityDescription}.</span>        
      </p>
    </div>
  );
};
