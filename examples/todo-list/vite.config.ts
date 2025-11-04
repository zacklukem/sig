import { defineConfig } from "vite";
export default defineConfig({
  resolve: {
    alias: {
      "@zacklukem/sig/jsx-runtime": "@zacklukem/sig",
      "@zacklukem/sig/jsx-dev-runtime": "@zacklukem/sig",
    },
  },
});
