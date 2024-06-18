import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    strictPort: true,
    port: 3000,
    host: "localhost",
    hmr: {
      host: "display-admin-client.local.itkdev.dk/ws",
      protocol: "wss",
      clientPort: 80,
    },
  },
});
