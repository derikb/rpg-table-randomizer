/* eslint-disable no-useless-escape */
import { isEmpty, isString, isObject, isUndefined } from './r_helpers.js';

/**
 * Take some data and normalize it into a config object for RandomTable
 */

/**
 * Try to parse HTML into table object data
 * @return {Array} table options
 */
const parseHtml = function (html) {
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

            if (!isUndefined(parse[1])) {
                let weight = 1;
                if (isUndefined(parse[2])) {
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

            if (!isUndefined(parse[4])) {
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
 * @returns {Array} parsed table data
 */
const parseText = function (text) {
    // split it into an array of lines
    text = text.split(/[\n\r]+/g);

    let ct = 0; // the cumulative 'die' count we'll use to calculate the weight
    text.forEach((v, k, l) => {
        v = v.trim();

        // parse numbers off front and subtables off back
        const parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
        // console.log(parse);
        if (parse) {
            // console.log(parse);
            let label = parse[3].trim();
            label = label.replace(/^[-*]\s?/, '');
            l[k] = { label: label };

            if (!isUndefined(parse[1])) {
                let weight = 1;
                if (isUndefined(parse[2])) {
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

            if (!isUndefined(parse[4])) {
                l[k].subtable = parse[4].trim();
            }
        } else {
            delete l[k];
        }
    });
    return text;
};

/**
 * Parse markdown...?
 * @todo
 */
// const parseMarkdown = function () {
// deal with headers
// deal with lists and sublists.
// };

/**
 * Decide what type of data it is so we can treat it appropriately.
 * @return {String} data_type
 */
const checkType = function (data) {
    if (isEmpty(data)) {
        return '';
    }
    if (isString(data)) {
        try {
            JSON.parse(data);
            return 'json';
        } catch (e) {
            // not json
        }
        // html should start with a tag.
        if (data.substring(0, 1) === '<') {
            this.data_type = 'html';
            return 'html';
        }
        return 'text';
    }
    if (isObject(data)) {
        return 'object';
    }
    return '';
};

/**
 * Process the data and try to do something
 */
const normalizeData = function (data = null) {
    if (isEmpty(data)) {
        return null;
    }
    const type = checkType(data);
    if (type === '') {
        return null;
    }
    let normalized_data = null;
    switch (type) {
        case 'html':
            normalized_data = parseHtml(data);
            break;
        case 'text':
            normalized_data = parseText(data);
            break;
        case 'json':
            normalized_data = JSON.parse(data);
            break;
    }

    // ?
    return normalized_data;
};

export default {
    normalizeData
};
