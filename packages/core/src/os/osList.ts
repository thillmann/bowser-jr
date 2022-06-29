import type { DescriptorList } from "../types";
import { getFirstMatch, getSecondMatch } from "../utils";
import { OS_MAP } from "./osMap";
import {
  getAndroidVersionName,
  getMacOSVersionName,
  getWindowsVersionName,
} from "./osUtils";

export interface OS {
  name?: string;
  version?: string;
  versionName?: string;
}

export const osList: DescriptorList<OS> = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(ua: string) {
      const version = getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version,
      };
    },
  },

  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(ua: string) {
      const version = getFirstMatch(
        /windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
        ua
      );
      return {
        name: OS_MAP.WindowsPhone,
        version,
      };
    },
  },

  /* Windows */
  {
    test: [/windows /i],
    describe(ua: string) {
      const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = getWindowsVersionName(version);

      return {
        name: OS_MAP.Windows,
        version,
        versionName,
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(ua: string) {
      const result: OS = {
        name: OS_MAP.iOS,
      };
      const version = getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
      if (version) {
        result.version = version;
      }
      return result;
    },
  },

  /* macOS */
  {
    test: [/macintosh/i],
    describe(ua: string) {
      const version = getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(
        /[_\s]/g,
        "."
      );
      const versionName = getMacOSVersionName(version);

      const os: OS = {
        name: OS_MAP.MacOS,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua: string) {
      const version = getFirstMatch(
        /os (\d+([_\s]\d+)*) like mac os x/i,
        ua
      ).replace(/[_\s]/g, ".");

      return {
        name: OS_MAP.iOS,
        version,
      };
    },
  },

  /* Android */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua: string) {
      const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = getAndroidVersionName(version);
      const os: OS = {
        name: OS_MAP.Android,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua: string) {
      const version = getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os: OS = {
        name: OS_MAP.WebOS,
      };

      if (version && version.length) {
        os.version = version;
      }
      return os;
    },
  },

  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua: string) {
      const version =
        getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) ||
        getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) ||
        getFirstMatch(/\bbb(\d+)/i, ua);

      return {
        name: OS_MAP.BlackBerry,
        version,
      };
    },
  },

  /* Bada */
  {
    test: [/bada/i],
    describe(ua: string) {
      const version = getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Bada,
        version,
      };
    },
  },

  /* Tizen */
  {
    test: [/tizen/i],
    describe(ua: string) {
      const version = getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Tizen,
        version,
      };
    },
  },

  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux,
      };
    },
  },

  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS,
      };
    },
  },

  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(ua: string) {
      const version = getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version,
      };
    },
  },
];
