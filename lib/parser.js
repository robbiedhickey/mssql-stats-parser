import numeral from 'numeral'

import RowEnum from './model/RowEnum'
import StatsTimeInfo from './model/StatsTimeInfo'
import StatsSummary from './model/StatsSummary'
import {
  determineRowType,
  processTimeRow,
  processIORow,
  calculateIOTotals
} from './processors'

/**
 * SQL Statistics Parser, outputs structured IO/TIME statistics data
 */
class MssqlStatsParser {
  constructor () {
    this.descriptor = require('./descriptor.json')
  }

  /**
   * Parses a mssql statistics blob and returns a structured response
   *
   * @param {string} statisticsText - text blob of mssql statistics output
   * @returns {StatsSummary}
   */
  parseStatistics (statisticsText) {
    const descriptor = this.descriptor
    const rows = statisticsText.split('\n')
    let ioResult = []
    const aggregatedIoResult = []
    const executionTotal = new StatsTimeInfo()
    const compileTotal = new StatsTimeInfo()
    let isExecution = false
    let isCompile = false
    let isError = false
    let rowsAffected = 0
    let rowType = RowEnum.None

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]

      if (!isExecution && !isCompile && !isError) {
        rowType = determineRowType(row, descriptor)
      }

      switch (rowType) {
        case RowEnum.IO:
          ioResult.push(processIORow(row, descriptor))
          break
        case RowEnum.ExectuionTime:
          if (isExecution) {
            const et = processTimeRow(row, descriptor)
            executionTotal.cpu += et.cpu
            executionTotal.elapsed += et.elapsed
          }
          isExecution = !isExecution
          break
        case RowEnum.CompileTime:
          if (isCompile === true) {
            const ct = processTimeRow(row, descriptor)
            compileTotal.cpu += ct.cpu
            compileTotal.elapsed += ct.elapsed
          }
          isCompile = !isCompile
          break
        case RowEnum.RowsAffected: {
          const re = /'\\d+'/
          let numRows
          if ((numRows = re.exec(row)) !== null) {
            rowsAffected += numeral(numRows[0]).format('0,0')
          }
          break
        }
        case RowEnum.Error:
          isError = !isError
          break
        default:
          calculateIOTotals(ioResult)
          aggregatedIoResult.push(ioResult)
          ioResult = []
      }
    }

    const ioDetails = aggregatedIoResult.flat()
    const ioSummary = calculateIOTotals(ioDetails)

    return new StatsSummary(
      executionTotal,
      compileTotal,
      rowsAffected,
      ioDetails,
      ioSummary
    )
  }
}

export const parser = new MssqlStatsParser()
