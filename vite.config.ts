/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    // if you want to have `describe, test, it`
    // globally, comment out:
    // globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
  },
  build: {
    target: "es6",
    polyfillDynamicImport: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Bowser Jr.",
      fileName: (format) => `bowser-jr.${format}.js`,
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
