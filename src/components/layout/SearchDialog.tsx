"use client";

import { Button } from "../ui/button";

export const SearchDialog = () => {
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="h-9 w-full whitespace-nowrap px-4"
    >
      <p className="text-sm text-muted-foreground">
        Search city...{" "}
        <kbd className="pointer-events-none ml-auto inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hover:bg-primary md:ml-28">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
    </Button>
  );
};
