import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    strictPort: true,
    port: 3000,
    host: "localhost",
  },
});
