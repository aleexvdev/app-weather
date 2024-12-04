"use client";

import React from "react";
import { Button } from "../ui/button";
import { CloudMoonRain, Github } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full py-6 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl flex items-center gap-x-2">
          <CloudMoonRain className="w-8 h-8 text-blue-500" />
          <span className="text-blue-500 font-bold">Weather.app</span>
        </h1>
        <div className="flex shrink-0 gap-2 sm:w-fit">
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
            <Button variant={"default"} className="h-10 hidden md:block lg:flex items-center gap-x-2">
              <Github className="w-4 h-4" />
              <span className="font-medium hidden lg:block">Source Code</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
