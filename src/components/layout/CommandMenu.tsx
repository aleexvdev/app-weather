"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ModalSearch } from "./ModalSearch";

interface CommandMenuProps {
  oncloseList: () => void;
}

export const CommandMenu = ({ oncloseList }: CommandMenuProps) => {
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
        onClick={() => {
          setOpen(true);
          oncloseList();
        }}
        className="flex items-center justify-between gap-x-4 px-4 py-2 h-10 rounded-lg bg-blue-400 dark:bg-muted dark:hover:bg-muted/80 text-white"
      >
        <div className="flex items-center gap-x-2">
          <Search className="w-4 h-4" />
          <span className="text-sm hidden md:block">Search city...</span>
        </div>
        <kbd className="ml-2 text-xs bg-background px-2 py-1 rounded hidden md:block text-black dark:text-white">
          ⌘K
        </kbd>
      </button>
      <ModalSearch isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
