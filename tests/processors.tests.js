import { describe, it } from 'mocha';
import { expect } from 'chai';
import { determineRowType, processTimeRow, processIORow } from '../lib/processors';
import RowEnum from '../lib/model/RowEnum';
const descriptor = require('../lib/descriptor.json');

describe('Row Processors', function() {

  describe('determineRowType()', function () {
    it('correctly determines IO type', function () {
      const type = determineRowType(
        `Table 'PostTypes'. Scan count 1, logical reads 2, physical reads 1, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.`,
        descriptor
      );
      expect(type).to.equal(RowEnum.IO);
    });
  
    it('correctly determines CompileTime type', function () {
      const type = determineRowType(
        `SQL Server parse and compile time:`,
        descriptor
      );
      expect(type).to.equal(RowEnum.CompileTime);
    });
  
    it('correctly determines ExecutionTime type', function () {
      const type = determineRowType(
        ` SQL Server Execution Times:`,
        descriptor
      );
      expect(type).to.equal(RowEnum.ExectuionTime);
    });
  
    it('correctly determines Error type', function () {
      const type = determineRowType(
        `Msg 207, Level 16, State 1, Line 1`,
        descriptor
      );
      expect(type).to.equal(RowEnum.Error);
    });
  
    it('correctly determines RowsAffected type', function () {
      const type = determineRowType(
        `(233033 row(s) affected)`,
        descriptor
      );
      expect(type).to.equal(RowEnum.RowsAffected);
    });
  });
  
  describe('processTimeRow()', function() {
    it('correctly cpu and elapsed times', function() {
      const times = processTimeRow(`CPU time = 156527 ms,  elapsed time = 284906 ms.`, descriptor);
  
      expect(times.cpu).to.equal(156527)
      expect(times.elapsed).to.equal(284906)
    })
  });
  
  describe('processIORow()', function() {
    it('correctly parses IO table row', function() {
      const result = processIORow(`Table 'Votes'. Scan count 1, logical reads 250128, physical reads 10, read-ahead reads 250104, lob logical reads 2, lob physical reads 1, lob read-ahead reads 1.`, descriptor);
  
      expect(result.scan).to.equal(1);
      expect(result.logical).to.equal(250128);
      expect(result.physical).to.equal(10);
      expect(result.readahead).to.equal(250104);
      expect(result.loblogical).to.equal(2);
      expect(result.lobphysical).to.equal(1);
      expect(result.lobreadahead).to.equal(1);
    })
  })
})
