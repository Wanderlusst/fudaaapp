// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { operationContext, operationReducer } from "./operationReducer";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const savedThemeMode = localStorage.getItem("themeMode");
  const [isDarkTheme, setIsDarkTheme] = useState(savedThemeMode === "dark");
  const [themeMode, setThemeMode] = useState(savedThemeMode || "light");

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("themeMode", isDarkTheme ? "dark" : "light");
    setThemeMode(isDarkTheme ? "light" : "dark");
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeMode }}>
      <operationContext.Provider value={useReducer(operationReducer, { isDialogOpen: false })}>
        {children}
      </operationContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
