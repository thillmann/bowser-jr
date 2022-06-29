import { expect, test } from "vitest";

import { getParser } from "../parser";
import { osParser, getOS, getOSName, getOSVersion, getOSVersionName } from "./osParser";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165";
const parser = getParser(UA, { use: [osParser] });

test("should return the OS object", () => {
  expect(getOS(parser)).toEqual({
    name: "macOS",
    version: "10.12.4",
    versionName: "Sierra",
  });
});

test("should return the OS name", () => {
  expect(getOSName(parser)).toEqual("macOS");
});

test("should return the OS name in lower case", () => {
  expect(getOSName(parser, true)).toEqual("macos");
});

test("should return the OS version", () => {
  expect(getOSVersion(parser)).toEqual("10.12.4");
});

test("should return the OS version name", () => {
  expect(getOSVersionName(parser)).toEqual("Sierra");
});

test("should return the OS version name in lower case", () => {
  expect(getOSVersionName(parser, true)).toEqual("sierra");
});

test("should work with lazy parsing", () => {
  const lazyParser = getParser(UA, { use: [osParser], skipParsing: true });
  expect(() => lazyParser.getResult()).toThrow();
  expect(getOS(lazyParser)).toEqual({
    name: "macOS",
    version: "10.12.4",
    versionName: "Sierra",
  });
});
