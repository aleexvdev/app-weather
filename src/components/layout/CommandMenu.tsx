"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ModalSearch } from "./ModalSearch";

export const CommandMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

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

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-4 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm hidden md:block">Search city...</span>
        <kbd className="ml-2 text-xs bg-background px-2 py-1 rounded hidden md:block">
          ⌘K
        </kbd>
      </button>
      <ModalSearch isOpen={open} onClose={() => setOpen(false)} />
      {/* <CommandDialog key={query} open={open} onOpenChange={setOpen}>
        <DialogTitle>
          <VisuallyHidden>City Search Dialog</VisuallyHidden>
        </DialogTitle>
        <CommandInput
          placeholder="Search for a city..."
          onChangeCapture={handleQueryChange}
          value={query}
        />
        <CommandList>
          {loading && <div className="p-4 text-sm text-muted">Loading...</div>}
          {geolocation?.length === 0 ||
            (!geolocation && <CommandEmpty>No results found.</CommandEmpty>)}
          {geolocation && geolocation.length > 0 && (
            <CommandGroup heading="Suggestions">
              {geolocation.map((city) => (
                <CommandItem
                  key={city.lat}
                  onSelect={() => {
                    setLocation(city.lat, city.lon, city.name);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-base">
                      {city.country}
                    </span>
                    <span className="text-base font-medium">{city.name}</span>
                    <span className="text-base font-medium">{city.state}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog> */}
    </>
  );
};
