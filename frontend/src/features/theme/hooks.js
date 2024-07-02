import { useContext } from "react";
import { ThemeContext } from "./context";

/**
 * Custom hook to access the theme context
 * @returns {import("./types").ThemeProviderState}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
