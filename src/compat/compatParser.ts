import {
  browserParser,
  BROWSER_MAP,
  compareVersion,
  getBrowser,
  getBrowserName,
  getBrowserVersion,
  isBrowser,
} from "../browser";
import {
  engineParser,
  ENGINE_MAP,
  getEngine,
  getEngineName,
  isEngine,
} from "../engine";
import { getOS, getOSName, getOSVersion, isOS, osParser, OS_MAP } from "../os";
import { getParser, isAnything, isSome } from "../parser";
import {
  getPlatform,
  getPlatformType,
  isPlatform,
  platformParser,
  PLATFORMS_MAP,
} from "../platform";
import { IParser } from "../types";

/**
 * The main class that arranges the whole parsing process.
 */
class CompatParser {
  private parser: IParser;

  constructor(UA: string, skipParsing = false) {
    this.parser = getParser(UA, {
      use: [browserParser, engineParser, osParser, platformParser],
      skipParsing,
    });
  }

  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this.parser.getUA();
  }

  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex: RegExp) {
    return this.parser.test(regex);
  }

  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    return getBrowser(this.parser);
  }

  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return getBrowser(this.parser);
  }

  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(toLowerCase = false) {
    return getBrowserName(this.parser, toLowerCase);
  }

  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return getBrowserVersion(this.parser);
  }

  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return getOS(this.parser);
  }

  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    return getOS(this.parser);
  }

  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(toLowerCase = false) {
    return getOSName(this.parser, toLowerCase);
  }

  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return getOSVersion(this.parser);
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    getPlatform(this.parser);
  }

  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(_toLowerCase = false) {
    return getPlatformType(this.parser);
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    return getPlatform(this.parser);
  }

  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return getEngine(this.parser);
  }

  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(toLowerCase = false) {
    return getEngineName(this.parser, toLowerCase);
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    return getEngine(this.parser);
  }

  /**
   * Parse full information about the browser
   * @returns {CompatParser}
   */
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();

    return this;
  }

  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return this.parser.getResult();
  }

  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(checkTree: any): boolean | undefined {
    const platformsAndOSes: any = {};
    let platformsAndOSCounter = 0;
    const browsers: any = {};
    let browsersCounter = 0;

    const allDefinitions = Object.keys(checkTree);

    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === "string") {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === "object") {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });

    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = platformsAndOSNames.find((name) =>
        this.isOS(name)
      );

      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

        if (osResult !== undefined) {
          return osResult;
        }
      }

      const platformMatchingDefinition = platformsAndOSNames.find((name) =>
        this.isPlatform(name)
      );
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(
          platformsAndOSes[platformMatchingDefinition]
        );

        if (platformResult !== undefined) {
          return platformResult;
        }
      }
    }

    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = browserNames.find((name) =>
        this.isBrowser(name, true)
      );

      if (matchingDefinition !== undefined) {
        return this.compareVersion(browsers[matchingDefinition]);
      }
    }

    return undefined;
  }

  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(browserName: string, includingAlias = false) {
    return isBrowser(this.parser, browserName, includingAlias);
  }

  compareVersion(version: string) {
    return compareVersion(this.parser, version);
  }

  isOS(osName: string) {
    return isOS(this.parser, osName);
  }

  isPlatform(platformType: string) {
    return isPlatform(this.parser, platformType);
  }

  isEngine(engineName: string) {
    return isEngine(this.parser, engineName);
  }

  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(anything: string, includingAlias = false) {
    return isAnything(this.parser, anything, (parser, name) => isBrowser(parser, name, includingAlias), isPlatform, isOS);
  }

  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(anythings: string[] = []) {
    return isSome(this.parser, anythings, isBrowser, isPlatform, isOS);
  }
}

class BowserCompat {
  /**
   * Creates a {@link CompatParser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link CompatParser}.
   * @returns {CompatParser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(UA: string, skipParsing = false) {
    if (typeof UA !== "string") {
      throw new Error("UserAgent should be a string");
    }
    return new CompatParser(UA, skipParsing);
  }

  /**
   * Creates a {@link CompatParser} instance and runs {@link CompatParser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(UA: string) {
    return new CompatParser(UA).getResult();
  }

  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }

  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }

  static get OS_MAP() {
    return OS_MAP;
  }

  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}

export default BowserCompat;
