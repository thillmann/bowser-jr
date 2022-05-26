const { resolve } = require("path");
const {spawn} = require('child_process');
const { build } = require("vite");

const entryPoints = [
  ["Bowser-Jr", resolve(__dirname, "../src/index.ts")],
  ["Bowser-Jr-Browser", resolve(__dirname, "../src/browser/index.ts")],
  ["Bowser-Jr-Engine", resolve(__dirname, "../src/engine/index.ts")],
  ["Bowser-Jr-Platform", resolve(__dirname, "../src/platform/index.ts")],
  ["Bowser-Jr-OS", resolve(__dirname, "../src/os/index.ts")],
  ["Bowser-Jr-Compat", resolve(__dirname, "../src/compat/index.ts")],
];

let emptied = false;

Promise.all(entryPoints.map(([name, entry]) => {
  const buildPromise = build({
    configFile: resolve(__dirname, "../vite.config.ts"),
    build: {
      emptyOutDir: !emptied,
      lib: {
        entry,
        name,
        fileName: (format) => `${name.toLowerCase()}.${format}.js`,
      },
    },
  }).then(() => {

  });
  emptied = true;
  return buildPromise;
})).then(() => {
  spawn("tsc", ["--project", "tsconfig.lib.json"], { cwd: resolve(__dirname, "../")});
});
