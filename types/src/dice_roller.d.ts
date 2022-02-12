export default DiceRoller;
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
    toJSON(): {
        className: string;
        die: string;
        value: number;
    };
}
/**
 * Return a dice result.
 * @param {String} die Die roll notation.
 * @returns {DiceResult}
 */
export function getDiceResult(die?: string): DiceResult;
export class DiceRoller {
    /**
     *
     * @param {Number} die Die type
     * @returns {Number}
     */
    getSingleDieResult(die: number): number;
    /**
     * Apply a modifier to the number of dice retained.
     * @param {Number[]} rolls
     * @param {String} diemod Modifier to dice (drop/keep high/low count).
     * @returns
     */
    applyDieMod(rolls: number[], diemod: string): number[];
    /**
     * Dice rolling simulator
     * @param {Number} [die=6] Die type
     * @param {Number} [number=1] Number of times to roll the die
     * @param {Number} [modifier=0] Numeric modifier to dice total
     * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
     * @param {String} [diemod=''] Modifier to the dice (like keep/drop high/low die)
     * @returns {Number} Number rolled (die*number [mod_op][modifier])
     */
    _parseDiceNotation(die?: number, number?: number, modifier?: number, mod_op?: string, diemod?: string): number;
    /**
     * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
     * @params {String} string a die roll notation
     * @returns {Number} the result of the roll
     */
    rollDie(string?: string): number;
    /**
     * Return a dice result.
     * @param {String} die Die roll notation.
     * @returns {DiceResult}
     */
    getDiceResult(die?: string): DiceResult;
}
