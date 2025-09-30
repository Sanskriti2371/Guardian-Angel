import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Guardian Angel",
        short_name: "Guardian Angel",
        description: "A React Progressive Web App",
        theme_color: "#1a202c",
        background_color: "#1a202c",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "./LOgo.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./LOgo.jpg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
