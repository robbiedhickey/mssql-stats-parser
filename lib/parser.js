import numeral from 'numeral';

import RowEnum from './model/RowEnum';
import StatsTimeInfo from './model/StatsTimeInfo';
import StatsIOInfoTotal from './model/StatsIOInfoTotal';
import StatsSummary from './model/StatsSummary';
import {
  determineRowType,
  processTimeRow,
  calculateIOTotals,
  processIORow,
} from './processors';

/**
 * SQL Statistics Parser, outputs structured IO/TIME statistics data
 */
class MssqlStatsParser {
  constructor() {
    this.descriptor = require('./descriptor.json');
  }

  /**
   * Parses a mssql statistics blob and returns a structured response
   * 
   * @param {string} statisticsText - text blob of mssql statistics output
   * @returns {StatsSummary}
   */
  parseStatistics(statisticsText) {
    let descriptor = this.descriptor;
    let rows = statisticsText.split('\n');
    let ioResult = [];
    let aggregatedIoResult = [];
    let executionTotal = new StatsTimeInfo();
    let compileTotal = new StatsTimeInfo();
    let isExecution = false;
    let isCompile = false;
    let isError = false;
    let rowsAffected = 0;
    let rowType = RowEnum.None;

    for (var i = 0; i < rows.length; i++) {
      let row = rows[i];

      if (!isExecution && !isCompile && !isError) {
        rowType = determineRowType(row, descriptor);
      }

      switch (rowType) {
        case RowEnum.IO:
          ioResult.push(processIORow(row, descriptor));
          break;
        case RowEnum.ExectuionTime:
          if (isExecution) {
            let et = processTimeRow(row, descriptor);
            executionTotal.cpu += et.cpu;
            executionTotal.elapsed += et.elapsed;
          }
          isExecution = !isExecution;
          break;
        case RowEnum.CompileTime:
          if (isCompile === true) {
            let ct = processTimeRow(row, descriptor);
            compileTotal.cpu += ct.cpu;
            compileTotal.elapsed += ct.elapsed;
          }
          isCompile = !isCompile;
          break;
        case RowEnum.RowsAffected:
          let re = new RegExp('\\d+');
          let numRows;
          if ((numRows = re.exec(row)) !== null) {
            rowsAffected += numeral(numRows[0]).format('0,0');
          }
          break;
        case RowEnum.Error:
          isError = !isError;
          break;
        default:
          this.calculateIOTotals(ioResult);
          aggregatedIoResult.push(ioResult);
          ioResult = [];
      }
    }

    let ioDetails = aggregatedIoResult.flat();
    let ioSummary = this.calculateIOTotals(ioDetails);

    return new StatsSummary(
      executionTotal,
      compileTotal,
      rowsAffected,
      ioDetails,
      ioSummary
    );
  }

  /**
   * Aggregates and summarizes parsed IO statistics
   *
   * @param {StatsIOInfo[]} statInfos - parsed IO statistics rows
   * @returns {StatsInfoTotal}
   */
  calculateIOTotals(statInfos) {
    var statTotal = new StatsIOInfoTotal();

    for (var i = 0; i < statInfos.length; i++) {
      statTotal.scan += statInfos[i].scan;
      statTotal.logical += statInfos[i].logical;
      statTotal.physical += statInfos[i].physical;
      statTotal.readahead += statInfos[i].readahead;
      statTotal.loblogical += statInfos[i].loblogical;
      statTotal.lobphysical += statInfos[i].lobphysical;
      statTotal.lobreadahead += statInfos[i].lobreadahead;
    }

    // calculate read percentage
    for (var i = 0; i < statInfos.length; i++) {
      statInfos[i].percentread = Number(
        ((statInfos[i].logical / statTotal.logical) * 100).toFixed(2)
      );
    }

    return statTotal;
  }
}

export const parser = new MssqlStatsParser();
