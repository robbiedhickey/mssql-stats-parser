import RowEnum from './model/RowEnum';
import StatsTimeInfo from './model/StatsTimeInfo';
import StatsIOInfo from './model/StatsIOInfo';

/**
 * Determines the type of row we are about to process
 * 
 * @param {string} row - the row of statistics output to process
 * @param {object} descriptor - contains metadata about the structure of statistics output
 * @returns {RowEnum}
 */
export function determineRowType(row, descriptor) {
  var rowType = RowEnum.None;

  if (row.substring(0, 7) === descriptor.table) {
    rowType = RowEnum.IO;
  } else if (row.trim() === descriptor.executiontime) {
    rowType = RowEnum.ExectuionTime;
  } else if (row.trim() === descriptor.compiletime) {
    rowType = RowEnum.CompileTime;
  } else if (row.indexOf(descriptor.rowsaffected) > -1) {
    rowType = RowEnum.RowsAffected;
  } else if (row.substring(0, 3) === descriptor.errormsg) {
    rowType = RowEnum.Error;
  }

  return rowType;
}

/**
 * Parses statistics TIME output
 * @param {string} row 
 * @param {descriptor} descriptor 
 * @returns {StatsTimeInfo}
 */
export function processTimeRow(row, descriptor) {
  let section = row.split(',');

  let processTimeRegEx = (preText, postText) => new RegExp('(.*' + preText + '+)(.*?)(\\s+' + postText + '.*)')
  let cpu = processTimeRegEx(descriptor.cputime, descriptor.milliseconds);
  let elapsed = processTimeRegEx(descriptor.elapsedtime, descriptor.milliseconds);

  return new StatsTimeInfo(
    section[0].replace(cpu, '$2'),
    section[1].replace(elapsed, '$2')
  );
}

/**
 * Processes statistics IO data for a table row
 *  
 * @param {string} row - the row of statistics output to process
 * @param {object} descriptor - contains metadata about the structure of statistics output
 * @returns {StatsIOInfo}
 */
export function processIORow(row, descriptor) {
  function getTableName(str, delim) {
    var a = str.indexOf(delim);
    if (a == -1) return '';
    var b = str.indexOf(delim, a + 1);
    if (b == -1) return '';
    return str.substr(a + 1, b - a - 1);
  }

  let section = row.split('.');
  let tableName = getTableName(section[0], "'");
  let tableData = section[1];

  if (tableData) {
    let stat = tableData.split(/[,]+/);
    let statInfo = new StatsIOInfo(
      descriptor,
      tableName,
      stat[0],
      stat[1],
      stat[2],
      stat[3],
      stat[4],
      stat[5],
      stat[6]
    );
    return statInfo;
  } else {
    if (row.length > 0) {
      let statInfo = new StatsIOInfo(
        descriptor,
        row
      );
      statInfo.nostats = true;
      return statInfo;
    }
  }
}