"use client";

import { useDailyForecastStore } from "@/store/dailyForecastStore";
import { formatNumber } from "@/utils/misc";
import { UsersRound } from "lucide-react";
import { motion } from "framer-motion";

export const Population = () => {
  const { city, loading, error } = useDailyForecastStore();

  if (loading) return renderSkeleton();
  if (error || !city || !city.population) return renderNoData();

  const formatPopulation = formatNumber(city.population as number);
  const populationText = city.population
    ? formatPopulation.toLocaleString()
    : "?";

  return (
    <motion.div
      className="population-card w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col justify-between gap-4 shadow-lg text-gray-700 dark:text-gray-100 
        bg-gradient-to-b from-green-400 via-green-600 to-green-800 dark:from-green-600 dark:via-green-700 dark:to-green-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="flex items-center gap-3 text-xl font-semibold text-green-900 dark:text-green-100"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <UsersRound className="w-6 h-6" /> Population
      </motion.h2>
      <motion.p
        className="text-5xl text-center font-bold text-white"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {populationText}
      </motion.p>
      <p className="text-sm text-center text-white font-medium">
        Latest UN population data for {city.name}.
      </p>
    </motion.div>
  );
};

const renderSkeleton = () => (
  <motion.div
    className="skeleton-card w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-800"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-6 bg-gray-300 dark:bg-gray-400 rounded-md w-1/3"></div>
    <div className="h-12 bg-gray-300 dark:bg-gray-400 rounded-md w-2/3 mx-auto mt-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded-md w-1/2 mx-auto"></div>
  </motion.div>
);

const renderNoData = () => (
  <motion.div
    className="no-data-card w-full col-span-1 row-span-1 py-4 px-6 rounded-lg flex flex-col gap-2 shadow-lg 
      bg-gradient-to-b from-gray-300 via-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-900 text-gray-700 dark:text-gray-100"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-gray-200">
      <UsersRound className="w-6 h-6" /> Population
    </h2>
    <p className="text-center text-sm text-gray-800 dark:text-gray-300 font-medium mt-4">
      Population data unavailable. Please check your connection or try again
      later.
    </p>
  </motion.div>
);
