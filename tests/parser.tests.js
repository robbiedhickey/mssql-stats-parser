import { describe, it } from 'mocha'
import { expect } from 'chai'
import { parser } from '../lib/parser'
const descriptor = require('../lib/descriptor.json');

describe('parser', function () {
  it('contains a properly formed stats descriptor', function () {
    const keys = Object.keys(parser.descriptor);

    expect(keys).to.include("logical", "physical");
  });

  it('returns correct number of ioDetails', function () {
    const result = parser.parseStatistics(descriptor.sampleoutput);
    expect(result.ioDetails).to.have.length(11);
  });
})
