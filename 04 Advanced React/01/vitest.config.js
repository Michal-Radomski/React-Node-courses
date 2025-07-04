//* Vitest instead of Jest!

import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  //* This can be in vite.config.ts
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
  },
});
