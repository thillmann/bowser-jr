import type { IParser } from "../types";
import { Platform, platformsList } from "./platformsList";

export function platformParser(parser: IParser): { platform: Platform } {
  let result: Platform = {};

  const platformDescriptor = platformsList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }

    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }

    throw new Error("Browser's test function is not valid");
  });

  if (platformDescriptor) {
    result = platformDescriptor.describe(parser.getUA());
  }

  return { platform: result };
}

export function getPlatform<T extends IParser<{ platform: Platform }>>(
  parser: T
) {
  try {
    return parser.getResult().platform;
  } catch {
    return platformParser(parser).platform;
  }
}

export function getPlatformType<T extends IParser<{ platform: Platform }>>(
  parser: T
) {
  return getPlatform(parser).type ?? "";
}

export function getPlatformVendor<T extends IParser<{ platform: Platform }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getPlatform(parser).vendor ?? "").toLowerCase();
  }
  return getPlatform(parser).vendor ?? "";
}

export function getPlatformModel<T extends IParser<{ platform: Platform }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getPlatform(parser).model ?? "").toLowerCase();
  }
  return getPlatform(parser).model ?? "";
}

/**
 * Check if the platform type equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the platform type
 * @returns {boolean}
 */
export function isPlatform<T extends IParser<{ platform: Platform }>>(
  parser: T,
  platformType: string
) {
  return getPlatformType(parser) === platformType.toLowerCase();
}
