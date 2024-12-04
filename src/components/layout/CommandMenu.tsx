"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useForecastStore } from "@/store/forecastStore";
import { DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const { setLocation } = useForecastStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.006 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  ];
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-4 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Search city...</span>
        <kbd className="ml-2 text-xs bg-background px-2 py-1 rounded">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle>
          <VisuallyHidden>City Search Dialog</VisuallyHidden>
        </DialogTitle>
        <CommandInput placeholder="Search for a city..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {cities.map((city) => (
              <CommandItem
                key={city.name}
                onSelect={() => {
                  setLocation(city.lat, city.lon, city.name);
                  setOpen(false);
                }}
              >
                {city.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
