import { expect, test } from "vitest";

import { getParser } from "../parser";
import {
  getPlatform,
  getPlatformModel,
  getPlatformType,
  getPlatformVendor,
  platformParser,
} from "./platformParser";

const UA =
  "Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53";
const parser = getParser(UA, { use: [platformParser] });

test("should return the platform object", () => {
  expect(getPlatform(parser)).toEqual({
    type: "tablet",
    vendor: "Apple",
    model: "iPad"
  });
});

test("should return the platform type", () => {
  expect(getPlatformType(parser)).toEqual("tablet");
});

test("should return the platform vendor", () => {
  expect(getPlatformVendor(parser)).toEqual("Apple");
});

test("should return the platform vendor in lower case", () => {
  expect(getPlatformVendor(parser, true)).toEqual("apple");
});

test("should return the platform model", () => {
  expect(getPlatformModel(parser)).toEqual("iPad");
});

test("should return the platform model in lower case", () => {
  expect(getPlatformModel(parser, true)).toEqual("ipad");
});

test("should work with lazy parsing", () => {
  const lazyParser = getParser(UA, {
    use: [platformParser],
    skipParsing: true,
  });
  expect(() => lazyParser.getResult()).toThrow();
  expect(getPlatform(lazyParser)).toEqual({
    type: "tablet",
    vendor: "Apple",
    model: "iPad"
  });
});
