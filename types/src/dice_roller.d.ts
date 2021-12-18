/**
 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
 * @params {String} string a die roll notation
 * @returns {Number} the result of the roll
 */
export function rollDie(string?: string): number;
/**
 * @prop {String} die Die notation.
 * @prop {Number} value Random roll for the die notation.
 */
export class DiceResult {
    constructor({ die, value }: {
        die?: string;
        value?: number;
    });
    die: string;
    value: number;
    toString(): number;
}
/**
 * Return a dice result.
 * @param {String} die Die roll notation.
 * @returns {DiceResult}
 */
export function getDiceResult(die?: string): DiceResult;
