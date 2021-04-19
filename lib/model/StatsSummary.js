/**
 * Summarizes parsed statistics/IO data
 *
 * @export
 * @class StatsSummary
 */
export default class StatsSummary {
  constructor (executionTotal, compileTotal, rowsAffected, ioDetails, ioSummary) {
    this.executionTotal = executionTotal
    this.compileTotal = compileTotal
    this.rowsAffected = rowsAffected
    this.ioDetails = ioDetails
    this.ioSummary = ioSummary
  }
}
