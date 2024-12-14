"use client";

import { useGeolocationStore } from "@/store/geolocationStore";
import { useLocationStore } from "@/store/locationStore";
import { Search, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSearch = ({ isOpen, onClose }: ModalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setLocation } = useLocationStore();
  const { geolocation, loading, fetchGeolocation } = useGeolocationStore();

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setSearchQuery(value);
      if (value.length >= 3) {
        fetchGeolocation(value);
      }
    },
    [fetchGeolocation]
  );

  const reset = () => {
    setSearchQuery("");
  };

  const suggestions = useMemo(() => {
    if (loading) {
      return (
        <div className="text-sm text-black dark:text-white">Loading...</div>
      );
    }

    if (!geolocation || geolocation.length === 0) {
      return (
        <div className="text-sm text-black dark:text-white">
          No results found.
        </div>
      );
    }

    return geolocation.map((city) => (
      <button
        key={`${city.lat}-${city.lon}`}
        className="cursor-pointer hover:bg-gray-300 dark:hover:bg-black p-2 rounded-md"
        onClick={() => {
          setLocation(city.lat, city.lon, city.name);
          onClose();
          reset();
        }}
      >
        <div className="flex items-center gap-x-2">
          <span className="font-semibold text-base">{city.country}</span>
          <span className="text-base font-medium">{city.name}</span>
          <span className="text-base font-medium">{city.state}</span>
        </div>
      </button>
    ));
  }, [geolocation, loading, setLocation, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#2c2c2c] rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="py-2 px-4">
              <div className="w-full flex items-center justify-between gap-x-4">
                <div className="flex items-center justify-start gap-x-2 border-b border-gray-500/20 w-full">
                  <Search className="w-5 h-5" />
                  <input
                    type="text"
                    className="appearance-none border-none bg-transparent w-full py-2 dark:text-white leading-tight focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleQueryChange}
                  />
                </div>
                <button
                  className="dark:bg-[#353535] hover:dark:bg-[#292929] p-1 rounded-lg"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-y-4 my-4">
                <span className="text-sm text-black dark:text-white/60 font-semibold">
                  Suggestions
                </span>
                <div className="flex flex-col gap-y-2 justify-between">
                  {suggestions}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
