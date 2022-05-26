import * as fs from "fs";
import * as path from "path";

import { expect, test } from "vitest";

import * as yaml from "js-yaml";
import { parse } from "../src/parser";
import { browserParser } from "../src/browser";
import { engineParser } from "../src/engine";
import { platformParser } from "../src/platform";
import { osParser } from "../src/os";

const listOfUA = yaml.load(
  fs.readFileSync(path.join(__dirname, "useragents.yaml"), "utf8")
) as { [key: string]: any[] };

const browserNames = Object.keys(listOfUA);

browserNames.forEach((browserName) => {
  listOfUA[browserName].forEach((browser, index) => {
    test(`Test ${browserName} ${index}`, (t) => {
      const parsed = parse(browser.ua, {
        use: [browserParser, engineParser, platformParser, osParser],
      });
      expect(parsed).toEqual(browser.spec);
      expect(parsed.browser.name).toEqual(browserName);
    });
  });
});
