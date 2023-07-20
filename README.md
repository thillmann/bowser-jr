# Bowser Jr.

A small, lightweight and *composable* browser detection utility heavily inspired by [`bowser`](https://github.com/lancedikson/bowser).

[![Unit Tests](https://github.com/thillmann/bowser-jr/actions/workflows/test.yaml/badge.svg)](https://github.com/thillmann/bowser-jr/actions/workflows/test.yaml)

## Installation

Install it using your favourite package manager:

```bash
$ npm install bowser-jr
# or
$ yarn add bowser-jr
# or
$ pnpm add bowser-jr
```

## Usage

Now just import `getParser` and the `parsers` you need:

```ts
import { getParser } from 'bowser-jr';
import { getBrowserName, browserParser } from 'bowser-jr/browser';

const parser = getParser(window.navigator.userAgent, { use: [browserParser] });

console.log(getBrowserName(parser)); // outputs `Firefox`
```

### Using multiple parsers

You can use multiple parsers to extract more information from the user agent:

```ts
import { getParser } from 'bowser-jr';
import { browserParser } from 'bowser-jr/browser';
import { engineParser } from 'bowser-jr/engine';
import { osParser } from 'bowser-jr/os';
import { platformParser } from 'bowser-jr/platform';

const parser = getParser(window.navigator.userAgent, {
    use: [browserParser, engineParser, osParser, platformParser],
});

console.log(parser.getResult());
```

### Bowser compat utilities

`bowser-jr` also comes with a compatibility utility for [`bowser`](https://github.com/lancedikson/bowser) to make adoption a little easier:

```ts
import BowserCompat from 'bowser-jr/compat';

const browser = BowserCompat.getParser(window.navigator.userAgent);
console.log(browser.getBrowser());

// outputs
{
  name: "Internet Explorer"
  version: "11.0"
}
```
