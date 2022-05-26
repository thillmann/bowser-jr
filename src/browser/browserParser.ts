import type { IParser } from "../types";
import { Browser, browsersList } from "./browsersList";
import { compareVersions, getBrowserTypeByAlias } from "./browserUtils";

export function browserParser(parser: IParser): { browser: Browser } {
  let result: Browser = {};

  const browserDescriptor = browsersList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }

    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }

    throw new Error("Browser's test function is not valid");
  });

  if (browserDescriptor) {
    result = browserDescriptor.describe(parser.getUA());
  }

  return { browser: result };
}

export function getBrowser<T extends IParser<{ browser: Browser }>>(parser: T) {
  try {
    return parser.getResult().browser;
  } catch {
    return browserParser(parser).browser;
  }
}

export function getBrowserName<T extends IParser<{ browser: Browser }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getBrowser(parser).name ?? "").toLowerCase();
  }
  return getBrowser(parser).name ?? "";
}

export function getBrowserVersion<T extends IParser<{ browser: Browser }>>(
  parser: T
) {
  return getBrowser(parser).version ?? "";
}

/**
 * Check if the browser name equals the passed string
 * 
 * @param   {IParser} parser The parser instance
 * @param   {string} browserName The string to compare with the browser name
 * @param   {boolean} [includingAlias=false] The flag showing whether alias will be included into comparison
 * @returns {boolean}
 */
export function isBrowser<T extends IParser<{ browser: Browser }>>(
  parser: T,
  browserName: string,
  includingAlias = false
) {
  const defaultBrowserName = getBrowserName(parser, true);
  let browserNameLower = browserName.toLowerCase();
  const alias = getBrowserTypeByAlias(browserNameLower);

  if (includingAlias && alias) {
    browserNameLower = alias.toLowerCase();
  }
  return browserNameLower === defaultBrowserName;
}

/**
 * Check if the browser version equals the passed version
 * 
 * @param   {IParser} parser The parser instance
 * @param   {string} version The version to compare with the browser version
 * @returns {boolean}
 */
export function compareVersion<T extends IParser<{ browser: Browser }>>(
  parser: T,
  version: string
) {
  let expectedResults = [0];
  let comparableVersion = version;
  let isLoose = false;

  const currentBrowserVersion = getBrowserVersion(parser);

  if (typeof currentBrowserVersion !== "string") {
    return false;
  }

  if (version[0] === ">" || version[0] === "<") {
    comparableVersion = version.substr(1);
    if (version[1] === "=") {
      isLoose = true;
      comparableVersion = version.substr(2);
    } else {
      expectedResults = [];
    }
    if (version[0] === ">") {
      expectedResults.push(1);
    } else {
      expectedResults.push(-1);
    }
  } else if (version[0] === "=") {
    comparableVersion = version.substr(1);
  } else if (version[0] === "~") {
    isLoose = true;
    comparableVersion = version.substr(1);
  }

  return (
    expectedResults.indexOf(
      compareVersions(currentBrowserVersion, comparableVersion, isLoose) ??
        Infinity
    ) > -1
  );
}
