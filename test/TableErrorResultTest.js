'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import TableErrorResult from '../src/TableErrorResult.js';

describe('TableErrorResult', function () {
    it('should unserialize an object to the class props', function () {
        const resultObj = new TableErrorResult({
            table: 'error',
            result: '',
            desc: ''
        });

        expect(resultObj.table).to.equal('error');
        expect(resultObj.result).to.equal('');
        expect(resultObj.desc).to.equal('');
        expect(resultObj.isError).to.equal(true);
    });

    it('should serialize a class to an object', function () {
        const resultObj = new TableErrorResult({
            table: 'error'
        });

        const serialized = resultObj.toJSON();
        expect(serialized.table).to.equal('error');
        expect(serialized.result).to.equal('');
        expect(serialized.desc).to.equal('');
        expect(serialized.className).to.equal('TableErrorResult');
    });
});
