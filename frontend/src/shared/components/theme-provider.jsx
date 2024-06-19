import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {"dark" | "light" | "system"} Theme
 */

/**
 * @typedef {Object} ThemeProviderProps
 * @property {import("react").ReactNode} children
 * @property {Theme} [defaultTheme="system"]
 * @property {string} [storageKey="vite-ui-theme"]
 */

/**
 * @typedef {Object} ThemeProviderState
 * @property {Theme} theme
 * @property {function(Theme): void} setTheme
 */

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

/**
 * ThemeProvider component
 * @param {ThemeProviderProps} props
 * @returns {import("react").ReactElement}
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook to access the theme context
 * @returns {ThemeProviderState}
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
