import { expect, test } from "vitest";

import { getFirstMatch, getSecondMatch } from "./utils";

test("should find first match", () => {
  const matchedVersion = getFirstMatch(
    /version\/(\S+)/i,
    "Chrome Version/11.11.11"
  );
  expect(matchedVersion).toEqual("11.11.11");
});

test("should find second match", () => {
  const matchedVersion = getSecondMatch(
    /version\/(\S+).*version\/(\S+)/i,
    "Chrome Version/11.11.11 Chrome Version/22.22.22"
  );
  expect(matchedVersion).toEqual("22.22.22");
});
