export default class StatsTimeInfo {
  constructor (cpu, elapsed) {
    this.cpu = parseInt(cpu || 0)
    this.elapsed = parseInt(elapsed || 0)
  }
}
