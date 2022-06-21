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
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: {
        'bowser-jr': resolve(__dirname, 'src/index.ts'),
        'bowser-jr-compat': resolve(__dirname, 'src/compat/index.ts'),
        'bowser-jr-browser': resolve(__dirname, 'src/browser/index.ts'),
        'bowser-jr-engine': resolve(__dirname, 'src/engine/index.ts'),
        'bowser-jr-os': resolve(__dirname, 'src/os/index.ts'),
        'bowser-jr-platform': resolve(__dirname, 'src/platform/index.ts'),
      },
      output: [
        {
          entryFileNames: ({ name }) => `${name}.es.js`,
          format: 'esm',
          dir: resolve(__dirname, 'dist')
        },
        {
          entryFileNames: ({ name }) => `${name}.umd.js`,
          format: 'commonjs',
          exports: 'named',
          dir: resolve(__dirname, 'dist')
        },
      ]
    }
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
