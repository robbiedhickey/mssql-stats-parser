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

## Usage 

The API surface area of this library is intentionally small, the parser has one function called `parseStatistics` that accepts a statistics blob and returns a formatted result.

```js
import parser from 'mssql-stats-parser'

let statsText = someFunctionThatReturnsStatistics()
let statsSummary = parser.parseStatistics(statsText)
console.log(statsSummary)
```

This will output a `StatsSummary` object with the following information. It includes rolled up summary aggregations of the stats/IO data as well as the details to identify the biggest offenders.

```js
StatsSummary {
  executionTotal: StatsTimeInfo { cpu: 173734, elapsed: 323069 },
  compileTotal: StatsTimeInfo { cpu: 124, elapsed: 127 },
  rowsAffected: 0,
  ioDetails: [
    StatsIOInfo {
      table: 'PostTypes',
      nostats: false,
      scan: 1,
      logical: 2,
      physical: 1,
      readahead: 0,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0
    },
    StatsIOInfo {
      table: 'Users',
      nostats: false,
      scan: 5,
      logical: 42015,
      physical: 1,
      readahead: 41306,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0.23
    },
    StatsIOInfo {
      table: 'Comments',
      nostats: false,
      scan: 5,
      logical: 1089402,
      physical: 248,
      readahead: 1108174,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 5.95
    },
    StatsIOInfo {
      table: 'PostTags',
      nostats: false,
      scan: 5,
      logical: 77500,
      physical: 348,
      readahead: 82219,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0.42
    },
    StatsIOInfo {
      table: 'Posts',
      nostats: false,
      scan: 5,
      logical: 397944,
      physical: 9338,
      readahead: 402977,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 2.17
    },
    StatsIOInfo {
      table: 'Worktable',
      nostats: false,
      scan: 999172,
      logical: 16247024,
      physical: 0,
      readahead: 0,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 88.73
    },
    StatsIOInfo {
      table: 'Worktable',
      nostats: false,
      scan: 0,
      logical: 0,
      physical: 0,
      readahead: 0,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0
    },
    StatsIOInfo {
      table: 'Worktable',
      nostats: false,
      scan: 0,
      logical: 0,
      physical: 0,
      readahead: 0,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0
    },
    StatsIOInfo {
      table: 'Votes',
      nostats: false,
      scan: 1,
      logical: 250128,
      physical: 10,
      readahead: 250104,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 1.37
    },
    StatsIOInfo {
      table: 'Posts',
      nostats: false,
      scan: 1,
      logical: 165586,
      physical: 18,
      readahead: 49191,
      loblogical: 823463,
      lobphysical: 42854,
      lobreadahead: 3272,
      percentread: 0.9
    },
    StatsIOInfo {
      table: 'Users',
      nostats: false,
      scan: 1,
      logical: 41405,
      physical: 3,
      readahead: 41401,
      loblogical: 0,
      lobphysical: 0,
      lobreadahead: 0,
      percentread: 0.23
    }
  ],
  ioSummary: StatsIOInfoTotal {
    scan: 999196,
    logical: 18311006,
    physical: 9967,
    readahead: 1975372,
    loblogical: 823463,
    lobphysical: 42854,
    lobreadahead: 3272
  }
}
```
## License

MIT, see [license file](LICENSE)

## Prior Art

This library is based on the excellent work by `Jorriss` on the [Statistics Parser](https://statisticsparser.com/) website. The original code can be found [here](https://github.com/Jorriss/StatisticsParser).

The npm package structure is based on the work of `jankapunkt` and his [npm package template](https://github.com/jankapunkt/npm-package-template) repository. 

