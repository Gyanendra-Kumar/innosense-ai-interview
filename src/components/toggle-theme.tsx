"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-6 rounded-full bg-accent dark:bg-primary transition-colors flex items-center px-1"
    >
      <motion.div
        animate={{ x: isDark ? 20 : 0 }} // shift to right when dark
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-5 h-5 rounded-full flex items-center justify-center shadow cursor-pointer ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-gray-200" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
}
