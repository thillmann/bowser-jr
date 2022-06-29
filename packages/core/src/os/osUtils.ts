/**
 * Get Windows version name
 *
 * @example
 *   getWindowsVersionName("NT 10.0") // "10"
 *
 * @param   {string} version
 * @returns {string} versionName
 */
export function getWindowsVersionName(version: string) {
  switch (version) {
    case "NT":
      return "NT";
    case "XP":
      return "XP";
    case "NT 5.0":
      return "2000";
    case "NT 5.1":
      return "XP";
    case "NT 5.2":
      return "2003";
    case "NT 6.0":
      return "Vista";
    case "NT 6.1":
      return "7";
    case "NT 6.2":
      return "8";
    case "NT 6.3":
      return "8.1";
    case "NT 10.0":
      return "10";
    default:
      return undefined;
  }
}

/**
 * Get macOS version name
 *    10.5 - Leopard
 *    10.6 - Snow Leopard
 *    10.7 - Lion
 *    10.8 - Mountain Lion
 *    10.9 - Mavericks
 *    10.10 - Yosemite
 *    10.11 - El Capitan
 *    10.12 - Sierra
 *    10.13 - High Sierra
 *    10.14 - Mojave
 *    10.15 - Catalina
 *
 * @example
 *   getMacOSVersionName("10.14") // 'Mojave'
 *
 * @param  {string} version
 * @return {string} versionName
 */
export function getMacOSVersionName(version: string) {
  const v = version
    .split(".")
    .splice(0, 2)
    .map((s) => parseInt(s, 10) || 0);
  v.push(0);
  if (v[0] !== 10) return undefined;
  switch (v[1]) {
    case 5:
      return "Leopard";
    case 6:
      return "Snow Leopard";
    case 7:
      return "Lion";
    case 8:
      return "Mountain Lion";
    case 9:
      return "Mavericks";
    case 10:
      return "Yosemite";
    case 11:
      return "El Capitan";
    case 12:
      return "Sierra";
    case 13:
      return "High Sierra";
    case 14:
      return "Mojave";
    case 15:
      return "Catalina";
    default:
      return undefined;
  }
}

/**
 * Get Android version name
 *    1.5 - Cupcake
 *    1.6 - Donut
 *    2.0 - Eclair
 *    2.1 - Eclair
 *    2.2 - Froyo
 *    2.x - Gingerbread
 *    3.x - Honeycomb
 *    4.0 - Ice Cream Sandwich
 *    4.1 - Jelly Bean
 *    4.4 - KitKat
 *    5.x - Lollipop
 *    6.x - Marshmallow
 *    7.x - Nougat
 *    8.x - Oreo
 *    9.x - Pie
 *
 * @example
 *   getAndroidVersionName("7.0") // 'Nougat'
 *
 * @param  {string} version
 * @return {string} versionName
 */
export function getAndroidVersionName(version: string) {
  const v = version
    .split(".")
    .splice(0, 2)
    .map((s) => parseInt(s, 10) || 0);
  v.push(0);
  if (v[0] === 1 && v[1] < 5) return undefined;
  if (v[0] === 1 && v[1] < 6) return "Cupcake";
  if (v[0] === 1 && v[1] >= 6) return "Donut";
  if (v[0] === 2 && v[1] < 2) return "Eclair";
  if (v[0] === 2 && v[1] === 2) return "Froyo";
  if (v[0] === 2 && v[1] > 2) return "Gingerbread";
  if (v[0] === 3) return "Honeycomb";
  if (v[0] === 4 && v[1] < 1) return "Ice Cream Sandwich";
  if (v[0] === 4 && v[1] < 4) return "Jelly Bean";
  if (v[0] === 4 && v[1] >= 4) return "KitKat";
  if (v[0] === 5) return "Lollipop";
  if (v[0] === 6) return "Marshmallow";
  if (v[0] === 7) return "Nougat";
  if (v[0] === 8) return "Oreo";
  if (v[0] === 9) return "Pie";
  return undefined;
}
