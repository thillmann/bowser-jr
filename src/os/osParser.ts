import type { IParser } from "../types";
import { OS, osList } from "./osList";

export function osParser(parser: IParser): { os: OS } {
  let result: OS = {};

  const osDescriptor = osList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }

    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }

    throw new Error("Browser's test function is not valid");
  });

  if (osDescriptor) {
    result = osDescriptor.describe(parser.getUA());
  }

  return { os: result };
}

export function getOS<T extends IParser<{ os: OS }>>(parser: T) {
  try {
    return parser.getResult().os;
  } catch {
    return osParser(parser).os;
  }
}

export function getOSName<T extends IParser<{ os: OS }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getOS(parser).name ?? "").toLowerCase();
  }
  return getOS(parser).name ?? "";
}

export function getOSVersion<T extends IParser<{ os: OS }>>(parser: T) {
  return getOS(parser).version ?? "";
}

export function getOSVersionName<T extends IParser<{ os: OS }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getOS(parser).versionName ?? "").toLowerCase();
  }
  return getOS(parser).versionName ?? "";
}

/**
 * Check if the OS name equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the OS name
 * @returns {boolean}
 */
export function isOS<T extends IParser<{ os: OS }>>(parser: T, osName: string) {
  return getOSName(parser, true) === osName.toLowerCase();
}
