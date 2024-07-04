import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    strictPort: true,
    port: 3000,
    host: "localhost",
    hmr: {
      host: "display-admin-client.local.itkdev.dk",
      protocol: "wss",
      clientPort: 443,
      path: "/ws",
    },
  },
});
