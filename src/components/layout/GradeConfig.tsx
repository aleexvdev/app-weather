"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGradeStore } from "@/store/gradeStore";

interface GradeConfigProps {
  close: () => void;
}

export const GradeConfig = ({ close }: GradeConfigProps) => {
  const { grade, setGrade } = useGradeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="theme" size="sm" className="w-full md:w-10 h-10">
          <span className="text-sm font-medium">
            {grade === "C" ? "°C" : "°F"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          about="Celsius"
          onClick={() => {
            setGrade("C");
            close();
          }}
        >
          Celsius
        </DropdownMenuItem>
        <DropdownMenuItem
          about="Fahrenheit"
          onClick={() => {
            setGrade("F");
            close();
          }}
        >
          Fahrenheit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
