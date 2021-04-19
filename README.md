# :package: MSSQL Statistics Parser :package:

![Test suite](https://github.com/robbiedhickey/mssql-stats-parser/workflows/Test%20suite/badge.svg)
[![Build Status](https://travis-ci.org/robbiedhickey/mssql-stats-parser.svg?branch=main)](https://travis-ci.org/robbiedhickey/mssql-stats-parser)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![GitHub](https://img.shields.io/github/license/robbiedhickey/mssql-stats-parser)

A utility library for parsing MSSQL statistics/IO output into a structured response. It was developed for integration into CI/CD tooling to track performance of SQL changes over time. 

## Documentation

Documentation is using jsDoc and is available as [html](docs/index.html) or [markdown](api.md) version.

To build the documentation in development, you need to run 

```bash
$ npm run docs
``` 

## License

MIT, see [license file](LICENSE)

## Prior Art

This library is based on the excellent work by `Jorriss` on the [Statistics Parser](https://statisticsparser.com/) website. The original code can be found [here](https://github.com/Jorriss/StatisticsParser).

The npm package structure is based on the work of `jankapunkt` and his [npm package template](https://github.com/jankapunkt/npm-package-template) repository. 

