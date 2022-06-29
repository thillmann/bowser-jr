import { expect, test } from "vitest";

import { getParser } from "../parser";
import { engineParser, getEngine, getEngineName } from "./engineParser";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165";
const parser = getParser(UA, { use: [engineParser] });

test("should return the engine object", () => {
  expect(getEngine(parser)).toEqual({
    name: "Blink",
  });
});

test("should return the engine name", () => {
  expect(getEngineName(parser)).toEqual("Blink");
});

test("should return the engine name in lower case", () => {
  expect(getEngineName(parser, true)).toEqual("blink");
});

test("should work with lazy parsing", () => {
  const lazyParser = getParser(UA, { use: [engineParser], skipParsing: true });
  expect(() => lazyParser.getResult()).toThrow();
  expect(getEngine(lazyParser)).toEqual({
    name: "Blink",
  });
});
