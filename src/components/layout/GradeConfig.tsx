"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GradeConfigProps {
  close: () => void;
}

export const GradeConfig = ({ close }: GradeConfigProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="theme" size="icon" className="w-full md:w-10 h-10">
          <span className="text-sm font-medium">°C</span>
          <span className="sr-only">°F</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            close();
          }}
        >
          Celsius
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            close();
          }}
        >
          Fahrenheit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
