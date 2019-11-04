<p align="center">
  <img src="/logo_01.png" alt="Refetty" />
</p>

Refetty is a set of tools to help on REST APIs challange, like sdk creation.


## Packages

This repository is a monorepo that we manage using  [Lerna](https://github.com/lerna/lerna). That means that we actually publish  [several packages](https://github.com/brunobertolini/refetty/blob/master/packages)  to npm from the same codebase, including:

| Package                  | Version                                                                   | Description                                                                         |
| ------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [sdk](/packages/sdk)     | ![npm](https://img.shields.io/npm/v/@refetty/sdk.svg?style=flat-square)   | State handler with AbortController support                                          |
| [async](/packages/async) | ![npm](https://img.shields.io/npm/v/@refetty/async.svg?style=flat-square) | Promises handle methods                                                             |
| [react](/packages/react) | ![npm](https://img.shields.io/npm/v/@refetty/react.svg?style=flat-square) | Hooks to work with promises (using [async](/packages/async) package under the hood) |