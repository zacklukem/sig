import { defineConfig } from "vite";
export default defineConfig({
  resolve: {
    alias: {
      "sig/jsx-runtime": "sig",
      "sig/jsx-dev-runtime": "sig",
    },
  },
});
