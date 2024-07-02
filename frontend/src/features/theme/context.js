import { createContext } from "react";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeContext = createContext(initialState);
