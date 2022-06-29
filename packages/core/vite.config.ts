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
        'bowserjr': resolve(__dirname, 'src/index.ts'),
        'compat': resolve(__dirname, 'src/compat/index.ts'),
        'browser': resolve(__dirname, 'src/browser/index.ts'),
        'engine': resolve(__dirname, 'src/engine/index.ts'),
        'os': resolve(__dirname, 'src/os/index.ts'),
        'platform': resolve(__dirname, 'src/platform/index.ts'),
      },
      output: [
        {
          entryFileNames: ({ name }) => `${name}.js`,
          format: 'esm',
          dir: resolve(__dirname, 'dist/es')
        },
        {
          entryFileNames: ({ name }) => `${name}.js`,
          format: 'commonjs',
          exports: 'named',
          dir: resolve(__dirname, 'dist/cjs')
        },
      ]
    }
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
