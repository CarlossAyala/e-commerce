import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    hmr: true,
    host: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["node_modules"],
      },
    },
  },
});
