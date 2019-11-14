<h1 align="center">
  <img src="/logo.png" alt="Refetty" />
</h1>

[![Build Status](https://travis-ci.org/brunobertolini/refetty.svg?branch=develop)](https://travis-ci.org/brunobertolini/refetty)

> **Refetty is a set of tools to help on REST API consume challenge**, like promise cancelable handler, sdk creation and asynchronous promise state manager


## Highlights

- :tada: Generic promise state handlers
- :electric_plug: Framework agnostic
- :crystal_ball: AbortController friendly
- :trophy: State management on sdk, (**stop passing access token to all requests manually** :pray:)
- :fire: Some more awesome utilities

## Packages

This repository is a monorepo that we manage using  [Lerna](https://github.com/lerna/lerna). That means that we actually publish  [several packages](https://github.com/brunobertolini/refetty/blob/master/packages)  to npm from the same codebase, including:

| Package                  | Version                                                                   | Description                                                                         |
| ------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [sdk](/packages/sdk)     | ![npm](https://img.shields.io/npm/v/@refetty/sdk.svg?style=flat-square)   | State handler with AbortController support                                          |
| [async](/packages/async) | ![npm](https://img.shields.io/npm/v/@refetty/async.svg?style=flat-square) | Promises handle methods                                                             |
| [react](/packages/react) | ![npm](https://img.shields.io/npm/v/@refetty/react.svg?style=flat-square) | Hooks to work with promises (using [async](/packages/async) package under the hood) |


## Contribute

You can help improving this project sending PRs and helping with issues.