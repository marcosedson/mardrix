import React, { useState } from "react";
import useColorMode from "@/hooks/useColorMode";
import { Sun, Moon } from "lucide-react";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          colorMode === "dark" ? "bg-primary" : "bg-stroke"
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === "function") {
              setColorMode(colorMode === "light" ? "dark" : "light");
            }
          }}
          className="dur m-0 ob solute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute left-0.5 top-0.5 flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white transition-transform duration-200 ease-linear ${
            colorMode === "dark" ? "!translate-x-full" : ""
          }`}
        >
          <span className="dark:hidden">
            <Sun size={18} className="text-body" />
          </span>
          <span className="hidden dark:inline-block">
            <Moon size={18} className="text-body" />
          </span>
        </span>
      </label>
    </li>
  );
};

export default DarkModeSwitcher;
