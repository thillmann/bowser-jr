import type { IParser, UnionToIntersection } from "./types";

type FeatureParser<T> = (parser: IParser) => T;

export interface ParserOptions<T extends FeatureParser<any>[]> {
  use: T;
  skipParsing?: boolean;
}

type Result<T extends FeatureParser<any>[]> = UnionToIntersection<
  ReturnType<T[number]>
>;

type Keys<T extends FeatureParser<any>[]> = keyof Result<T>;

class Parser<T extends FeatureParser<any>[]> implements IParser {
  private result!: Result<T>;
  private features: T;

  constructor(private ua: string, options: ParserOptions<T>) {
    this.features = options.use;

    if (options.skipParsing !== true) {
      this.parse();
    }
  }

  getUA(): string {
    return this.ua;
  }

  test(regexp: RegExp): boolean {
    return regexp.test(this.ua);
  }

  parse(): Result<T> {
    if (this.result) {
      return this.result;
    }

    let result: Partial<Result<T>> = {};

    this.features.forEach((feature) => {
      result = {
        ...result,
        ...feature(this),
      };
    });

    this.result = result as Result<T>;

    return this.result;
  }

  getResult(): Result<T> {
    if (!this.result) {
      throw new Error("You need to parse before calling `getResult`");
    }
    return this.result;
  }

  get<K extends Keys<T>>(key: K): Result<T>[K] {
    if (!this.result || !(key in (this.result as {}))) {
      throw new Error(`\`${key}\` not found in result`);
    }
    return this.result[key];
  }
}

export function getParser<T extends FeatureParser<any>[]>(
  UA: string,
  options: ParserOptions<T>
): Parser<T> {
  return new Parser(UA, options);
}

export function parse<T extends FeatureParser<any>[]>(
  UA: string,
  options: ParserOptions<T>
) {
  return getParser(UA, options).getResult();
}

export function isAnything<
  P extends IParser,
  T extends ((parser: P, str: string) => boolean)[]
>(parser: P, anything: string, ...args: T) {
  for (const comparator of args) {
    if (comparator(parser, anything)) {
      return true;
    }
  }
  return false;
}

export function isSome<
  P extends IParser,
  T extends ((parser: P, str: string) => boolean)[]
>(parser: P, anythings: string[], ...args: T) {
  return anythings.some((anything) => isAnything(parser, anything, ...args));
}
