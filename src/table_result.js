import { capitalize, isUndefined } from './r_helpers.js';

/**
 * Class for results from RandomTable
 */
class RandomTableResult {
    /**
     * @property {String} table Title of subtable.
     * @property {String} result Randomized result label.
     * @property {String} desc Extra result description.
     */
    constructor({
        table = '',
        result = '',
        desc = ''
    }) {
        this.table = table;
        this.result = result;
        this.desc = desc;
    }
    /**
     * Is this from the "default" table.
     */
    get isDefault() {
        return this.table === 'default';
    }
    /**
     * Is this an error result.
     */
    get isError() {
        return this.table == 'Error';
    }
    toString() {
        return this.result;
    }
}
/**
 * Set of table results.
 */
class RandomTableResultSet {
    /**
     * @property {String} title Title from the RandomTable parent
     * @property {RandomTableResult[]} results Randomized results.
     * @property {Object} printOptions Print settings from the RandomTable parent.
     */
    constructor({
        title = '',
        results = [],
        printOptions = {}
    }) {
        this.title = title;
        this.results = [];
        results.forEach((r) => {
            this.addResult(r);
        });
        this.printOptions = printOptions;
    }
    /**
     * Add a result to the set.
     * @param {RandomTableResult|object} data
     * @returns
     */
    addResult(data) {
        if (data instanceof RandomTableResult) {
            this.results.push(data);
            return;
        }
        this.results.push(new RandomTableResult(data));
    }

    get isSimple() {
        return this.results.length == 1;
    }

    /**
     * Find the result for a specific table/subtable
     * @param {String} table The table to look for
     * @returns {RandomTableResult|null}
     */
	findResultByTable(table = 'default') {
		const obj = this.results.find((v) => {
			return v.table === table;
		});
		return isUndefined(obj) ? null : obj;
	}

    niceString(simple = false) {
		if (this.results.length === 0) {
			return '';
		}

		if (simple) {
			return this.results[0].toString();
		}

		let output = '';
		this.results.forEach((result) => {
            if (result.isError) {
                output += `Error: ${result.result}\n`;
                return;
            }
            const printOpt = this.printOptions[result.table] || null;
			if (printOpt) {
				if (!printOpt.hide_table || printOpt.hide_table === 0) {
					output += `${capitalize(result.table)}: `;
				}
				if (!printOpt.hide_result || printOpt.hide_result === 0) {
					output += `${capitalize(result.result)}\n`;
				}
				if (!printOpt.hide_desc || printOpt.hide_desc === 0) {
					if (result.desc !== '') {
						output += `(${result.desc})\n`;
					}
				}
                return;
			}
            if (result.isDefault) {
                output += `${capitalize(result.result)}\n`;
            } else {
                output += `${capitalize(result.table)}: ${capitalize(result.result)}\n`;
            }
            if (result.desc !== '') {
                output += `${result.desc}\n`;
            }
		});
		return output.trim(); // trim off final linebreak
    }

    toString() {
        return this.niceString();
    }
}

export {
    RandomTableResult,
    RandomTableResultSet
};
