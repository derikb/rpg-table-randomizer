'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import DisplayOptions from '../src/DisplayOptions.js';

describe('DisplayOptions', function () {
    it('should serialize the class to an object (true options)', function () {
        const opts = new DisplayOptions({
            table: 'colors',
            hide_table: true,
            hide_result: 1,
            hide_desc: '1'
        });

        expect(opts.hide_table).to.be.true;
        expect(opts.hide_result).to.be.true;
        expect(opts.hide_desc).to.be.true;

        expect(opts.toJSON()).to.deep.equal({
            table: 'colors',
            hide_table: true,
            hide_result: true,
            hide_desc: true,
            className: 'DisplayOptions'
        });
    });

    it('should serialize the class to an object (false options)', function () {
        const opts = new DisplayOptions({
            table: 'colors',
            hide_table: false,
            hide_result: 0,
            hide_desc: 'no'
        });

        expect(opts.hide_table).to.be.false;
        expect(opts.hide_result).to.be.false;
        expect(opts.hide_desc).to.be.false;

        expect(opts.toJSON()).to.deep.equal({
            table: 'colors',
            className: 'DisplayOptions'
        });
    });
});
