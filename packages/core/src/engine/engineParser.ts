import type { IParser } from "../types";
import { Engine, enginesList } from "./enginesList";

export function engineParser(parser: IParser): { engine: Engine } {
  let result: Engine = {};

  const engineDescriptor = enginesList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }

    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }

    throw new Error("Browser's test function is not valid");
  });

  if (engineDescriptor) {
    result = engineDescriptor.describe(parser.getUA());
  }

  return { engine: result };
}

export function getEngine<T extends IParser<{ engine: Engine }>>(parser: T) {
  try {
    return parser.getResult().engine;
  } catch {
    return engineParser(parser).engine;
  }
}

export function getEngineName<T extends IParser<{ engine: Engine }>>(
  parser: T,
  toLowerCase = false
) {
  if (toLowerCase) {
    return (getEngine(parser).name ?? "").toLowerCase();
  }
  return getEngine(parser).name ?? "";
}

/**
 * Check if the engine name equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the engine name
 * @returns {boolean}
 */
export function isEngine<T extends IParser<{ engine: Engine }>>(
  parser: T,
  engineName: string
) {
  return getEngineName(parser, true) === engineName.toLowerCase();
}
