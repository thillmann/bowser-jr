import type { DescriptorList } from "../types";
import { getFirstMatch, getSecondMatch } from "../utils";
import { BROWSER_MAP } from "./browserMap";

export interface Browser {
  name?: string;
  version?: string;
}

const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

export const browsersList: DescriptorList<Browser> = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.googlebot,
      };
      const version =
        getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.opera,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.opera,
      };
      const version =
        getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.samsung_internet,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Whale/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.naver,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MZBrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.mz,
      };
      const version =
        getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/focus/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.focus,
      };
      const version =
        getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/swing/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.swing,
      };
      const version =
        getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/coast/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.opera_coast,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.opera_touch,
      };
      const version =
        getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/yabrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.yandex,
      };
      const version =
        getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/ucbrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.uc,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.maxthon,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/epiphany/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.epiphany,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/puffin/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.puffin,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sleipnir/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.sleipnir,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/k-meleon/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.k_meleon,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/micromessenger/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.wechat,
      };
      const version =
        getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qqbrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: /qqbrowserlite/i.test(ua) ? BROWSER_MAP.qqlite : BROWSER_MAP.qq,
      };
      const version =
        getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/msie|trident/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.ie,
      };
      const version = getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/\sedg\//i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.edge,
      };

      const version = getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.edge,
      };

      const version = getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/vivaldi/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.vivaldi,
      };
      const version = getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/seamonkey/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.seamonkey,
      };
      const version = getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sailfish/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.sailfish,
      };

      const version = getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/silk/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.amazon_silk,
      };
      const version = getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/phantom/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.phantomjs,
      };
      const version = getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/slimerjs/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.slimerjs,
      };
      const version = getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.blackberry,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.webos,
      };
      const version =
        getFirstMatch(commonVersionIdentifier, ua) ||
        getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/bada/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.bada,
      };
      const version = getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/tizen/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.tizen,
      };
      const version =
        getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qupzilla/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.qupzilla,
      };
      const version =
        getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.firefox,
      };
      const version = getFirstMatch(
        /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,
        ua
      );

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/electron/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.electron,
      };
      const version = getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.miui,
      };
      const version = getFirstMatch(
        /(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,
        ua
      );

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chromium/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.chromium,
      };
      const version =
        getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.chrome,
      };
      const version = getFirstMatch(
        /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,
        ua
      );

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/GSA/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.google_search,
      };
      const version = getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.android,
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.ps4,
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(ua: string) {
      const browser: Browser = {
        name: BROWSER_MAP.safari,
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Something else */
  {
    test: [/.*/i],
    describe(ua: string) {
      /* Here we try to make sure that there are explicit details about the device
       * in order to decide what regexp exactly we want to apply
       * (as there is a specific decision based on that conclusion)
       */
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search("\\(") !== -1;
      const regexp = hasDeviceSpec
        ? regexpWithDeviceSpec
        : regexpWithoutDeviceSpec;
      return {
        name: getFirstMatch(regexp, ua),
        version: getSecondMatch(regexp, ua),
      };
    },
  },
];
