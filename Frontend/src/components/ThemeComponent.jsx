import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ===============================
   Simple class merger
================================ */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ===============================
   Custom Theme Hook (Vite)
================================ */
const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, setTheme: updateTheme };
};

/* ===============================
   GIF Animation Creator
================================ */
const createGifAnimation = (gifUrl) => {
  return {
    css: `
      ::view-transition-group(root) {
        animation-timing-function: ease-in-out;
      }

      ::view-transition-new(root) {
        mask: url('${gifUrl}') center / 0 no-repeat;
        animation: scale 2s forwards;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 2s forwards;
      }

      @keyframes scale {
        0% {
          mask-size: 0;
        }
        15% {
          mask-size: 40vmax;
        }
        100% {
          mask-size: 2000vmax;
        }
      }
    `,
  };
};

/* ===============================
   Theme Toggle Hook
================================ */
const useThemeToggle = (gifUrl) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const animation = createGifAnimation(gifUrl);

    let style = document.getElementById("theme-transition-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "theme-transition-style";
      document.head.appendChild(style);
    }

    style.textContent = animation.css;

    const switchTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, gifUrl]);

  return { isDark, toggleTheme };
};

/* ===============================
   Toggle Button Component
================================ */
const ThemeToggleButton = ({ gifUrl }) => {
  const { isDark, toggleTheme } = useThemeToggle(gifUrl);

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-14 rounded-full bg-black dark:bg-white flex items-center justify-center transition active:scale-95 shadow-lg"
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-white dark:text-black text-xl"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
};


export default function SkiperGifDemo() {
  const [gifType, setGifType] = useState(1);

  const gifOptions = {
    1: "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif",
    2: "https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif",
    3: "https://media.giphy.com/media/WgsVx6C4N8tjy/giphy.gif",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center gap-10 transition-colors duration-500">
      
      <h1 className="text-4xl font-semibold text-center">
        GIF Theme Transition
      </h1>

      <ThemeToggleButton gifUrl={gifOptions[gifType]} />

      <div className="flex gap-4 mt-6">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setGifType(num)}
            className={cn(
              "px-4 py-2 rounded-lg border transition",
              gifType === num
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "opacity-60 hover:opacity-100"
            )}
          >
            GIF {num}
          </button>
        ))}
      </div>
    </div>
  );
}