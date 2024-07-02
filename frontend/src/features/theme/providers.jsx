import { useEffect, useState } from "react";
import { themes } from "../../scripts/utils";
import { ThemeContext } from "./context";
import { MODES, THEMES_NAMES } from "./utils";

/**
 * ThemeProvider component
 * @param {import("./types").ThemeProviderProps} props
 * @returns {import("react").ReactElement}
 */
export function ThemeProvider({
  children,
  defaultTheme = "zinc",
  defaultMode = "system",
  storageThemeKey = "vite-ui-theme",
  storageModeKey = "vite-ui-mode",
  ...props
}) {
  const [mode, setMode] = useState(() => {
    const m = localStorage.getItem(storageModeKey);
    return MODES.find((mode) => mode.value === m)?.value || defaultMode;
  });
  const [theme, setTheme] = useState(() => {
    const _theme = localStorage.getItem(storageThemeKey);
    return THEMES_NAMES.find((t) => t === _theme) || defaultTheme;
  });

  const handleModeChange = (m) => {
    if (MODES.find((mode) => mode.value === m)) {
      setMode(m);
      localStorage.setItem(storageModeKey, m);
    } else {
      setMode(defaultMode);
      localStorage.setItem(storageModeKey, defaultMode);
    }
  };

  const handleThemeChange = (t) => {
    if (THEMES_NAMES.includes(t)) {
      setTheme(t);
      localStorage.setItem(storageThemeKey, t);
    } else {
      setTheme(defaultTheme);
      localStorage.setItem(storageThemeKey, "zinc");
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...MODES.map((mode) => mode.value));

    if (mode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemMode);
    } else {
      root.classList.add(mode);
    }
  }, [mode]);

  useEffect(() => {
    const body = window.document.body;
    body.classList.remove(...themes.map((mode) => `theme-${mode.name}`));

    body.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = {
    theme,
    handleThemeChange,
    mode,
    handleModeChange,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
