import { expect, test } from "vitest";

import { browserParser, isBrowser } from "./browser";
import { engineParser, isEngine } from "./engine";
import { isOS, osParser } from "./os";
import { getParser, isAnything, isSome } from "./parser";
import { isPlatform, platformParser } from "./platform";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165";

test("should create a parser", () => {
  const parser = getParser(UA, { use: [browserParser] });
  expect(parser).toBeTruthy();
});

test("should return the user agent", () => {
  const parser = getParser(UA, { use: [browserParser] });
  expect(parser.getUA()).toEqual(UA);
});

test("should test the user agent against a supplied regular expression", () => {
  const parser = getParser(UA, { use: [browserParser] });
  expect(parser.test(/Chrome/i)).toBeTruthy();
});

test("should identify the browser correctly", () => {
  const parser = getParser(UA, { use: [browserParser] });
  expect(parser.getResult()).toEqual({
    browser: {
      name: "Opera",
      version: "43.0.2442.1165",
    },
  });
});

test("should support lazy parsing", () => {
  const parser = getParser(UA, { use: [browserParser], skipParsing: true });
  expect(() => parser.getResult()).toThrow();
  parser.parse();
  expect(parser.getResult()).toEqual({
    browser: {
      name: "Opera",
      version: "43.0.2442.1165",
    },
  });
});

test("should identify the engine correctly", () => {
  const parser = getParser(UA, { use: [engineParser] });
  expect(parser.getResult()).toEqual({
    engine: {
      name: "Blink",
    },
  });
});

test("should identify browser and engine correctly", () => {
  const parser = getParser(UA, { use: [browserParser, engineParser] });
  expect(parser.getResult()).toEqual({
    browser: {
      name: "Opera",
      version: "43.0.2442.1165",
    },
    engine: {
      name: "Blink",
    },
  });
});

test("should identify the OS correctly", () => {
  const parser = getParser(UA, { use: [osParser] });
  expect(parser.getResult()).toEqual({
    os: {
      name: "macOS",
      version: "10.12.4",
      versionName: "Sierra",
    },
  });
});

test("should identify the platform correctly", () => {
  const parser = getParser(UA, { use: [platformParser] });
  expect(parser.getResult()).toEqual({
    platform: {
      type: "desktop",
      vendor: "Apple",
    },
  });
});

test("should fully identify the user agent", () => {
  const parser = getParser(UA, {
    use: [browserParser, engineParser, osParser, platformParser],
  });
  expect(parser.getResult()).toEqual({
    browser: {
      name: "Opera",
      version: "43.0.2442.1165",
    },
    engine: {
      name: "Blink",
    },
    os: {
      name: "macOS",
      version: "10.12.4",
      versionName: "Sierra",
    },
    platform: {
      type: "desktop",
      vendor: "Apple",
    },
  });
});

test("is anything", () => {
  const parser = getParser(UA, {
    use: [browserParser, engineParser, osParser, platformParser],
  });
  expect(
    isAnything(parser, "opera", isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isAnything(parser, "blink", isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isAnything(parser, "macOS", isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isAnything(parser, "desktop", isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isAnything(parser, "tablet", isBrowser, isPlatform, isOS, isEngine)
  ).toBeFalsy();
});

test("is some", () => {
  const parser = getParser(UA, {
    use: [browserParser, engineParser, osParser, platformParser],
  });
  expect(
    isSome(parser, ["opera", "tablet"], isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isSome(parser, ["blink", "tablet"], isBrowser, isPlatform, isOS, isEngine)
  ).toBeTruthy();
  expect(
    isSome(parser, ["chrome", "tablet"], isBrowser, isPlatform, isOS, isEngine)
  ).toBeFalsy();
});
