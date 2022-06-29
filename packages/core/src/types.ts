export interface IParser<T = any> {
  getUA(): string;
  test(regexp: RegExp): boolean;
  getResult(): T;
}

export type Descriptor<T> = {
  test: RegExp[] | ((parser: IParser) => boolean);
  describe(ua: string): T;
};

export type DescriptorList<T> = Descriptor<T>[];

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never;
