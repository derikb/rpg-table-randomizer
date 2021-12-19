/**
 * Sum an array
 * @param {Array} arr an array of numbers
 * @returns {Number} Total value of numbers in array
 */
const arraySum = function (arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        const v = parseFloat(arr[i]);
        if (!isNaN(v)) {
            total += v;
        }
    }
    return total;
};

/**
 * Random integer between two numbers (stolen from underscorejs)
 * @param {Number} [min=0] mininum value
 * @param {Number} [max=null] maximum value
 * @returns {Number} random value
 */
const randomInteger = function (min = 0, max = null) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Random value selection
 * @param {Array} values an array of objects from which to choose
 * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
 * @returns {String} the randomly selected Array element from values param
 */
const getWeightedRandom = function (values, weights) {
    let n = 0;
    const num = randomInteger(1, arraySum.call(this, weights));
    let i = 0;
    for (i; i < values.length; i++) {
        n = n + weights[i];
        if (n >= num) {
            break;
        }
    }
    return values[i];
};
/**
 * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
 * @param {String[]} data values
 * @returns {String|null} the randomly selected string
 */
const randomString = function (data) {
    const values = [];
    const weights = [];

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }
    data.forEach((entry) => {
        weights.push(1);
        values.push(entry);
    });

    return getWeightedRandom(values, weights);
};

export {
    randomInteger,
    getWeightedRandom,
    randomString
};
