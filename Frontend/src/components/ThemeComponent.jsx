import { ThemeContext } from "@/context/Theme";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { Moon, Sun } from 'lucide-react'
export default function ThemeToggle() {
  const {theme, setTheme } = useContext(ThemeContext)
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light': 'dark')}
      className="p-1 w-10 rounded hover:bg-gray-200 dark:bg-[#2e2e2f] dark:hover:bg-[#1e1e1e] dark:bg-[]"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}