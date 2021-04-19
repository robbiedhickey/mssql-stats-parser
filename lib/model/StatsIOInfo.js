function infoReplace(strValue, searchValue, newvValue) {
  var returnValue = 0;
  if (strValue) {
    returnValue = parseInt(strValue.replace(searchValue, newvValue));
    if (isNaN(returnValue)) {
      returnValue = 0;
    }
  }
  return returnValue;
}

export default class StatsIOInfo {
  constructor(
    descriptor,
    table,
    scan,
    logical,
    physical,
    readahead,
    loblogical,
    lobphysical,
    lobreadahead
  ) {
    this.table = table;
    this.nostats = false;
    this.scan = infoReplace(scan, descriptor.scan, '');
    this.logical = infoReplace(logical, descriptor.logical, '');
    this.physical = infoReplace(physical, descriptor.physical, '');
    this.readahead = infoReplace(readahead, descriptor.readahead, '');
    this.loblogical = infoReplace(loblogical, descriptor.loblogical, '');
    this.lobphysical = infoReplace(lobphysical, descriptor.lobphysical, '');
    this.lobreadahead = infoReplace(lobreadahead, descriptor.lobreadahead, '');
    this.percentread = 0.0;
  }
}
