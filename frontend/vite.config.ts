import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@novorender/api/public",
          dest: "./public/novorender/api",
        },
      ],
    }),
  ],
});
