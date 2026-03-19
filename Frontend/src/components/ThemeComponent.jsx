import { ThemeContext } from "@/context/Theme";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { Moon, Sun } from 'lucide-react'
export default function ThemeToggle() {
  const {theme, setTheme } = useContext(ThemeContext)
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light': 'dark')}
      className="p-1 w-10 rounded hover:bg-white dark:bg-[#1e1e1e] dark:hover:bg-[#2e2e2f]"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}