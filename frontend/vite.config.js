/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    hmr: true,
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
    open: true,
  },
});
