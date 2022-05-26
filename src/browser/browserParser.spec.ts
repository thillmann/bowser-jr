import { expect, test } from "vitest";

import { getParser } from "../parser";
import {
  browserParser,
  compareVersion,
  getBrowser,
  getBrowserName,
  getBrowserVersion,
  isBrowser,
} from "./browserParser";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165";
const parser = getParser(UA, { use: [browserParser] });

test("should return the browser object", () => {
  expect(getBrowser(parser)).toEqual({
    name: "Opera",
    version: "43.0.2442.1165",
  });
});

test("should return the browser name", () => {
  expect(getBrowserName(parser)).toEqual("Opera");
});

test("should return the browser name in lower case", () => {
  expect(getBrowserName(parser, true)).toEqual("opera");
});

test("should return the browser version", () => {
  expect(getBrowserVersion(parser)).toEqual("43.0.2442.1165");
});

test("should work with lazy parsing", () => {
  const lazyParser = getParser(UA, { use: [browserParser], skipParsing: true });
  expect(() => lazyParser.getResult()).toThrow();
  expect(getBrowser(lazyParser)).toEqual({
    name: "Opera",
    version: "43.0.2442.1165",
  });
});

test("should detect the browser name", () => {
  expect(isBrowser(parser, "Opera")).toBeTruthy();
  expect(isBrowser(parser, "opera")).toBeTruthy();
  expect(isBrowser(parser, "chrome")).toBeFalsy();
});

test("should detect the browser version", () => {
  expect(compareVersion(parser, "43.0.2442.1165")).toBeTruthy();
  expect(compareVersion(parser, "=43.0.2442.1165")).toBeTruthy();
  expect(compareVersion(parser, ">42.0.0")).toBeTruthy();
  expect(compareVersion(parser, "<44.0.0")).toBeTruthy();
  expect(compareVersion(parser, "~43.0")).toBeTruthy();
  expect(compareVersion(parser, ">=43.0.0")).toBeTruthy();
  expect(compareVersion(parser, "<=44.0.0")).toBeTruthy();
  expect(compareVersion(parser, "~44.0")).toBeFalsy();
  expect(compareVersion(parser, ">43.1.0")).toBeFalsy();
  expect(compareVersion(parser, "<42.0.0")).toBeFalsy();
  expect(compareVersion(parser, ">=43.0.2443")).toBeFalsy();
  expect(compareVersion(parser, "<=43.0.0")).toBeFalsy();
});
