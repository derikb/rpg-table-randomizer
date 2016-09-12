'use strict';

const expect = require('chai').expect;
const r_helpers = require('../src/r_helpers');


describe('r_helpers module', function () {

	describe('isEmpty function', function () {
		it('should return true for an array of length 0', function () {
			expect(r_helpers.isEmpty([])).to.be.true;
		});
		it('should return true for a blank string', function () {
			expect(r_helpers.isEmpty('')).to.be.true;
		});
		it('should return true for numbers', function () {
			expect(r_helpers.isEmpty(0)).to.be.true;
			expect(r_helpers.isEmpty(4)).to.be.true;
		});
		it('should return true for an object with no own properties', function () {
			expect(r_helpers.isEmpty({})).to.be.true;
		});
		it('should return true for null', function () {
			expect(r_helpers.isEmpty(null)).to.be.true;
		});
		it('should return true for undefined', function () {
			expect(r_helpers.isEmpty(undefined)).to.be.true;
		});
		it('should return true for booleans', function () {
			expect(r_helpers.isEmpty(true)).to.be.true;
			expect(r_helpers.isEmpty(false)).to.be.true;
		});
		it('should return false for string', function () {
			expect(r_helpers.isEmpty('hello')).to.be.false;
		});
		it('should return false for an array of length 1', function () {
			expect(r_helpers.isEmpty(['hello'])).to.be.false;
		});
		it('should return false for an object with an own property', function () {
			expect(r_helpers.isEmpty({ a: 'hello' })).to.be.false;
		});
		it('should return true for a function', function () {
			expect(r_helpers.isEmpty(function hello(){ return 'hello'; })).to.be.true;
		});
	});
	
	describe('isString function', function () {
		it('should return true for a word', function () {
			expect(r_helpers.isString('hello')).to.be.true;
		});
		it('should return true for an empty string', function () {
			expect(r_helpers.isString('')).to.be.true;
		});
		it('should return false for an array', function () {
			expect(r_helpers.isString([])).to.be.false;
			expect(r_helpers.isString(['hello'])).to.be.false;
		});
		it('should return false for an object', function () {
			expect(r_helpers.isString({a:'hello'})).to.be.false;
			expect(r_helpers.isString({})).to.be.false;
		});
		it('should return false for null undefined or booleans', function () {
			expect(r_helpers.isString(null)).to.be.false;
			expect(r_helpers.isString(undefined)).to.be.false;
			expect(r_helpers.isString(true)).to.be.false;
			expect(r_helpers.isString(false)).to.be.false;
		});
	});
	
	describe('isObject function', function () {
		it('should return true for an object with no own properties', function () {
			expect(r_helpers.isObject({})).to.be.true;
		});
		it('should return true for an object with an own property', function () {
			expect(r_helpers.isObject({ a: 'hello' })).to.be.true;
		});
		it('should return true for an array of length 0', function () {
			expect(r_helpers.isObject([])).to.be.true;
		});
		it('should return true for an array of length 1', function () {
			expect(r_helpers.isObject(['hello'])).to.be.true;
		});
		it('should return true for a function', function () {
			expect(r_helpers.isObject(function hello(){ return 'hello'; })).to.be.true;
		});
		it('should return false for a blank string', function () {
			expect(r_helpers.isObject('')).to.be.false;
		});
		it('should return false for numbers', function () {
			expect(r_helpers.isObject(0)).to.be.false;
			expect(r_helpers.isObject(4)).to.be.false;
		});
		
		it('should return false for null', function () {
			expect(r_helpers.isObject(null)).to.be.false;
		});
		it('should return false for undefined', function () {
			expect(r_helpers.isObject(undefined)).to.be.false;
		});
		it('should return false for booleans', function () {
			expect(r_helpers.isObject(true)).to.be.false;
			expect(r_helpers.isObject(false)).to.be.false;
		});
		it('should return false for string', function () {
			expect(r_helpers.isObject('hello')).to.be.false;
		});
		it('should return true for an object with an own property', function () {
			expect(r_helpers.isObject({ a: 'hello' })).to.be.true;
		});
		
	});
	
	describe('isUndefined function', function () {
		it('should return true for undefined', function () {
			expect(r_helpers.isUndefined(undefined)).to.be.true;
		});
		it('should return true for an undefined property', function () {
			let obj = {};
			expect(r_helpers.isUndefined(obj.a)).to.be.true;
		});
		
		it('should return false for null', function () {
			expect(r_helpers.isUndefined(null)).to.be.false;
		});
		it('should return false for a string', function () {
			expect(r_helpers.isUndefined('')).to.be.false;
			expect(r_helpers.isUndefined('hello')).to.be.false;
		});
	});
	
	describe('capitalize function', function () {
		it('should return the word with first letter in uppercase', function () {
			expect(r_helpers.capitalize('hello')).to.equal('Hello');
		});
		it('should return a phrase with first letter of first word in uppercase', function () {
			expect(r_helpers.capitalize('hello world')).to.equal('Hello world');
		});
	});

});
