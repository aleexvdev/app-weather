"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const UvProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
      "shadow-inner",
      className
    )}
    {...props}
  >
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          "linear-gradient(to right, #10B981, #F59E0B, #F97316, #B91C1C, #6B21A8)",
      }}
    ></div>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex items-center justify-start"
      style={{ transform: `translateX(${value}%)` }}
    >
      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] mt-1 border-b-black -translate-x-1/2" />
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
));
UvProgress.displayName = ProgressPrimitive.Root.displayName;

export { UvProgress };
