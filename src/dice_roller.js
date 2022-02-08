/* eslint-disable no-useless-escape */
import { randomInteger } from './randomizer.js';

/**
 * @prop {String} die Die notation.
 * @prop {Number} value Random roll for the die notation.
 */
class DiceResult {
    constructor ({
        die = '',
        value = 0
    }) {
        this.die = die;
        this.value = value;
    }
    toString () {
        return this.value;
    }
    toJSON () {
        return {
            className: 'DiceResult',
            die: this.die,
            value: this.value
        };
    }
}

class DiceRoller {
    /**
     *
     * @param {Number} die Die type
     * @returns {Number}
     */
    getSingleDieResult (die) {
        return randomInteger(1, die);
    }
    /**
     * Apply a modifier to the number of dice retained.
     * @param {Number[]} rolls
     * @param {String} diemod Modifier to dice (drop/keep high/low count).
     * @returns
     */
    applyDieMod (rolls, diemod) {
        const m = diemod.match(/^([dklh]{2})([0-9]*)$/);
        if (m === null) {
            return rolls;
        }
        const count = !m[2] ? 1 : parseInt(m[2]);
        switch (m[1]) {
            case 'dl':
                // Sort ascending
                rolls.sort((a, b) => a - b);
                rolls.splice(0, count);
                return rolls;
            case 'dh':
                // Sort descending
                rolls.sort((a, b) => b - a);
                rolls.splice(0, count);
                return rolls;
            case 'kl':
                // Sort ascending
                rolls.sort((a, b) => a - b);
                return rolls.slice(0, count);
            case 'kh':
                // Sort descending
                rolls.sort((a, b) => b - a);
                return rolls.slice(0, count);
            default:
                return rolls;
        }
    }
    /**
     * Dice rolling simulator
     * @param {Number} [die=6] Die type
     * @param {Number} [number=1] Number of times to roll the die
     * @param {Number} [modifier=0] Numeric modifier to dice total
     * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
     * @param {String} [diemod=''] Modifier to the dice (like keep/drop high/low die)
     * @returns {Number} Number rolled (die*number [mod_op][modifier])
     */
    _parseDiceNotation (die = 6, number = 1, modifier = 0, mod_op = '+', diemod = '') {
        modifier = parseInt(modifier, 10);
        die = parseInt(die, 10);

        if (number <= 0) {
            number = 1;
        } else {
            number = parseInt(number, 10);
        }

        let rolls = [];
        for (let i = 1; i <= number; i++) {
            rolls.push(this.getSingleDieResult(die));
        }

        if (diemod !== '') {
            rolls = this.applyDieMod(rolls, diemod);
        }
        let sum = 0;
        if (rolls.length > 0) {
            sum = rolls.reduce((total, cur) => {
                return total + cur;
            });
        }
        if (modifier === 0) {
            return sum;
        }

        switch (mod_op) {
            case '*':
                sum = sum * modifier;
                break;
            case '-':
                sum = sum - modifier;
                break;
            case '/':
                sum = sum / modifier;
                break;
            case '+':
            default:
                sum = sum + modifier;
                break;
        }
        return Math.round(sum);
    }
    /**
     * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
     * @params {String} string a die roll notation
     * @returns {Number} the result of the roll
     */
    rollDie (string = '') {
        string = string.trim();
        const m = string.match(/^([0-9]*)d([0-9]+)([dklh]{2}[0-9]*)*(?:([\+\-\*\/])([0-9]+))*$/);
        if (!m) {
            return '';
        }
        return this._parseDiceNotation(m[2], m[1], m[5], m[4], m[3]);
    }
    /**
     * Return a dice result.
     * @param {String} die Die roll notation.
     * @returns {DiceResult}
     */
    getDiceResult (die = '') {
        return new DiceResult({
            die,
            value: this.rollDie(die)
        });
    }
}

/**
 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
 * @params {String} string a die roll notation
 * @returns {Number} the result of the roll
 */
const rollDie = function (string = '') {
    const roller = new DiceRoller();
    return roller.rollDie(string);
};

/**
 * Return a dice result.
 * @param {String} die Die roll notation.
 * @returns {DiceResult}
 */
const getDiceResult = function (die = '') {
    const roller = new DiceRoller();
    return new DiceResult({
        die,
        value: roller.rollDie(die)
    });
};

export {
    rollDie,
    DiceResult,
    getDiceResult,
    DiceRoller
};
export default DiceRoller;
