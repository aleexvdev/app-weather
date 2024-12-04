"use client";

import React from "react";
import { Button } from "../ui/button";
import { CloudMoonRain, Github } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <div className="w-full py-6 flex items-center justify-between">
      <h1 className="text-base md:text-2xl flex items-center gap-x-2">
        <CloudMoonRain className="w-8 h-8" />Weather.app
      </h1>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <CommandMenu />
        <ThemeToggle />
        <Link
          passHref
          href="https://github.com/aleexvdev/app-weather"
          prefetch={false}
          aria-label="Source Code"
          className="shrink-0"
          target="_blank"
        >
          <Button variant={"default"} className="h-10">
            <Github className="w-4 h-4 hidden md:block" />
            <span className="font-medium">Source Code</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
