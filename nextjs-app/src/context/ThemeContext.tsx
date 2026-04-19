"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const saved = localStorage.getItem("theme");
    const prefersDark = saved ? saved === "dark" : false;
    setIsDark(prefersDark);
    applyTheme(prefersDark);
  }, []);

  useEffect(() => {
    // Apply theme whenever isDark changes
    applyTheme(isDark);
  }, [isDark]);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDark = !prev;
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return newDark;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a safe default instead of throwing
    return { isDark: false, toggleTheme: () => {} };
  }
  return context;
}
