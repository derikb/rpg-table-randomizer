'use strict';

const r_helpers = require('./r_helpers');

/**
 * Take some data and normalize it into a config object for RandomTable
 * Module exports a constructor function
 */
const TableNormalizer = function (data) {
	this.orig_data = (typeof data !== 'undefined') ? data : ''; // save this for later if necessary
	this.normalized_data = {}; // normalized config object for RandomTable
	this.data_type = '';
	
	/**
	 * Set the data
	 * @param {String|Object|Array} data the data to normalize
	 */
	this.setData = function (data) {
		this.orig_data = data;
	};
	/**
	 * Decide what type of data it is so we can treat it appropriately.
	 */
	this.checkType = function () {
		const data = this.orig_data;
		if (r_helpers.isEmpty(data)) {
			this.data_type = '';
		} else if (r_helpers.isString(data)) {
			// html should start with a tag.... right?
			// @todo I'm sure there's a better way
			try {
				JSON.parse(data);
				this.data_type = 'json';
				return this.data_type;
			} catch (e) {
				// not json
			}
			if (data.substring(0, 1) === '<') {
				this.data_type = 'html';
				return this.data_type;
			}
			this.data_type = 'text';
		} else if (r_helpers.isObject(data)) {
			this.data_type = 'object';
		}
		return this.data_type;
	};
	/**
	 * Try to parse HTML into table object data
	 * @return {Array} table options
	 */
	this.parseHtml = function () {
		let html = this.orig_data;
		// strip linebreaks cause we'll be making new ones based on the tags
		html = html.replace(/[\n\r]+/g, '');
		// add line breaks for specific end tags li tr p br
		// @todo really <tr> leaves you with some weird data.
		html = html.replace(/<\/(p|tr|li|div)>|<\/?br\/?>/g, '\n').replace(/\t/g, '');
		
		html = html.replace(/<\/?[^>]+>/g, '').replace(/[\n\r]+$/g, '');
		// console.log(html);
		const text = html.split(/[\n\r]+/g);
		// console.log(text);
		
		let ct = 0;
		
		text.forEach((v, k, l) => {
			v = v.trim(); // trim spaces from ends
			// parse out the pre-post ## data (if it's there)
			const parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
			
			if (parse) {
				l[k] = { label: parse[3].trim() };
				
				if (typeof parse[1] !== 'undefined') {
					let weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						if (weight < 1) { weight = 1; }
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}
				
				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
	 * Try to parse text into table data
	 * @returns {Object} parsed table data
	 */
	this.parseText = function () {
		let text = this.orig_data;
		// split it into an array of lines
		text = text.split(/[\n\r]+/g);

		let ct = 0; // the cumulative 'die' count we'll use to calculate the weight
		text.forEach((v, k, l) => {
			v = v.trim();
			
			// parse numbers off front and subtables off back
			const parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
			console.log(parse);
			if (parse) {
				// console.log(parse);
				l[k] = { label: parse[3].trim() };
				
				if (typeof parse[1] !== 'undefined') {
					let weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						// console.log(weight);
						if (weight < 1) { weight = 1; }
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}
				
				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
	 * Process the data and try to do something
	 */
	this.normalizeData = function () {
		const type = this.checkType();
		if (type === '') {
			return false;
		}
		let parse_data = null;
		switch (type) {
			case 'html':
				parse_data = this.parseHtml();
				this.normalized_data = {
					table: {
						default: parse_data
					}
				};
				break;
			case 'text':
				parse_data = this.parseText();
				this.normalized_data = {
					tables: {
						default: parse_data
					}
				};
				break;
			case 'json':
				parse_data = JSON.parse(this.orig_data);
				this.normalized_data = parse_data;
				break;
		}
		
		// ?
		return this.normalized_data;
	};
};

module.exports = TableNormalizer;
