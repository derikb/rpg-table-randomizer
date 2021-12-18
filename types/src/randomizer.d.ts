/**
 * Random integer between two numbers (stolen from underscorejs)
 * @param {Number} [min=0] mininum value
 * @param {Number} [max=null] maximum value
 * @returns {Number} random value
 */
export function randomInteger(min?: number, max?: number): number;
/**
 * Random value selection
 * @param {Array} values an array of objects from which to choose
 * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
 * @returns {String} the randomly selected Array element from values param
 */
export function getWeightedRandom(values: any[], weights: any[]): string;
/**
 * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
 * @param {String[]} data values
 * @returns {String|null} the randomly selected string
 */
export function randomString(data: string[]): string | null;
