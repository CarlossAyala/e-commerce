/**
 * @typedef {"dark" | "light" | "system"} Theme
 */

/**
 * @typedef {Object} ThemeProviderProps
 * @property {import("react").ReactNode} children
 * @property {Theme} [defaultTheme="system"]
 * @property {Theme} [defaultMode="system"]
 * @property {string} [storageThemeKey="vite-ui-theme"]
 * @property {string} [storageModeKey="vite-ui-mode"]
 */

/**
 * @typedef {Object} ThemeProviderState
 * @property {Theme} theme
 * @property {function(Theme): void} handleThemeChange
 * @property {Theme} mode
 * @property {function(Theme): void} handleModeChange
 */

export {};
