import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        outDir: ".output/public",
        registerType: "autoUpdate",
        injectRegister: "auto",
        manifest: {
          name: "ExpertAction® — Price Action Trading Academy",
          short_name: "ExpertAction",
          description: "NISM-certified Price Action & Risk Management trading academy in Pune.",
          start_url: "/",
          display: "standalone",
          theme_color: "#0A192F",
          background_color: "#010a16",
          icons: [
            { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
            { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        },
      
      }),
    ],
  },
});