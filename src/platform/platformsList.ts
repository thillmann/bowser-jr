import type { DescriptorList } from "../types";
import { getFirstMatch } from "../utils";
import { PLATFORMS_MAP } from "./platformMap";

export interface Platform {
  type?: string;
  vendor?: string;
  model?: string;
}

export const platformsList: DescriptorList<Platform> = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google",
      };
    },
  },

  /* Huawei */
  {
    test: [/huawei/i],
    describe(ua: string) {
      const model = getFirstMatch(/(can-l01)/i, ua) && "Nova";
      const platform: Platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: "Huawei",
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    },
  },

  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Nexus",
      };
    },
  },

  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad",
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad",
      };
    },
  },

  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7",
      };
    },
  },

  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon",
      };
    },
  },

  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* iPod/iPhone */
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua: string) {
      const model = getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Apple",
        model,
      };
    },
  },

  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Nexus",
      };
    },
  },

  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* BlackBerry */
  {
    // NOTE: need to check for blackberry browser (see browsers list)
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "BlackBerry",
      };
    },
  },

  /* Bada */
  {
    // NOTE: need to check for bada browser (see browsers list)
    test: [/bada/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* Windows Phone */
  {
    // NOTE: need to check for Windows Phone (see OS list)
    test: [/windows phone/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Microsoft",
      };
    },
  },

  /* Android Tablet */
  {
    // NOTE: need to check for android version (see OS list)
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      const isAndroid = notLikeAndroid && butAndroid;

      const version = getFirstMatch(
        /android[\s/-](\d+(\.\d+)*)/i,
        parser.getUA()
      );

      const osMajorVersion = Number(String(version).split(".")[0]);

      return isAndroid && osMajorVersion >= 3;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* Android Mobile */
  {
    // NOTE: need to check for android (see OS list)
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* desktop */
  {
    // NOTE: need to check for macOS (see OS list)
    test: [/macintosh/i],
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: "Apple",
      };
    },
  },

  /* Windows */
  {
    // NOTE: need to check for Windows (see OS list)
    test(parser) {
      const maybeLinux = parser.test(/windows/i);
      const isRoku = parser.test(/Roku\/DVP/);
      const isWebOS = parser.test(/(web|hpw)[o0]s/i);
      return maybeLinux && !isRoku && !isWebOS;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* Linux */
  {
    // NOTE: need to check for Linux (see OS list)
    test(parser) {
      const maybeLinux = parser.test(/linux/i);
      const isRoku = parser.test(/Roku\/DVP/);
      const isWebOS = parser.test(/(web|hpw)[o0]s/i);
      return maybeLinux && !isRoku && !isWebOS;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* PlayStation 4 */
  {
    // NOTE: need to check for PlayStation 4 (see OS list)
    test: [/PlayStation 4/],
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },

  /* Roku */
  {
    // NOTE: need to check for Roku (see OS list)
    test: [/Roku\/DVP/],
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },
];
