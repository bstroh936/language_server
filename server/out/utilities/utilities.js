"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitText = exports.checkSyntax = exports.checkCommands = exports.checkComments = exports.displayOnlyToken = exports.check_tokens = exports.removeTokens = exports.testBlankLine = exports.testTokenPos = exports.sortTokens = exports.stripNullTokens = void 0;
const enums_1 = require("./enums");
function stripNullTokens(tokens) {
    const ret = [];
    tokens.forEach(e => {
        if (e !== null && e !== undefined) {
            ret.push(e);
        }
    });
    return ret;
}
exports.stripNullTokens = stripNullTokens;
function sortTokens(tokens) {
    let cleaned = stripNullTokens(tokens);
    for (let i = 1; i < cleaned.length; i++) {
        for (let j = i - 1; j > -1; j--) {
            const p_i = cleaned[j + 1].line_pos;
            const p_j = cleaned[j].line_pos;
            if (p_i < p_j) {
                [cleaned[j + 1], cleaned[j]] = [cleaned[j], cleaned[j + 1]];
            }
        }
    }
    return cleaned;
}
exports.sortTokens = sortTokens;
/**
 *
 * @param {*} token_1 {line:int,pos:int}
 * @param {*} token_2 {line:int,pos:int}
 * @returns {boolean} If token_1=>token_2 returns true, otherwise false
 */
function testTokenPos(token_1, token_2) {
    if (token_2.line < token_1.line) {
        return true;
    }
    else if (token_2.line === token_1.line && token_2.pos <= token_1.pos) {
        return true;
    }
    else {
        return false;
    }
}
exports.testTokenPos = testTokenPos;
function testBlankLine(line) {
    const blankRegEx = /^(\s*|""|[ ]+)$/g;
    //console.log(`Testing line (${line}) for blankness...\nResult: ${blankRegEx.test(line)}`)
    return blankRegEx.test(line);
}
exports.testBlankLine = testBlankLine;
function removeTokens(line, token) {
    const st = ' '.repeat(token.length);
    return line.replace(token.token, st);
}
exports.removeTokens = removeTokens;
function check_tokens(type, line, match_multiple = false) {
    if (testBlankLine(line)) {
        return [];
    }
    let c_type, tests;
    switch (type) {
        case 'comment':
            c_type = enums_1.SerpentEnums.comment_ids;
            tests = enums_1.SerpentEnums.comment_tests;
            break;
        case 'syntax':
            c_type = enums_1.SerpentEnums.syntax_ids;
            tests = enums_1.SerpentEnums.syntax_tests;
            break;
        case 'command':
            c_type = enums_1.SerpentEnums.command_ids;
            tests = enums_1.SerpentEnums.all_commands_test;
            break;
        default:
            c_type = [type];
            tests = [enums_1.SerpentEnums.test_id(type)];
            break;
    }
    return testArray(line, type, tests, c_type, match_multiple);
}
exports.check_tokens = check_tokens;
function displayOnlyToken(token_id) {
    const list = enums_1.SerpentEnums.comment_ids.concat(enums_1.SerpentEnums.syntax_ids);
    const regex = enums_1.SerpentEnums.test_list(list);
    return regex.test(token_id);
}
exports.displayOnlyToken = displayOnlyToken;
function checkComments(line) {
    return check_tokens('comment', line);
}
exports.checkComments = checkComments;
function checkCommands(line) {
    return check_tokens('command', line);
}
exports.checkCommands = checkCommands;
function checkSyntax(line) {
    return check_tokens('syntax', line);
}
exports.checkSyntax = checkSyntax;
function splitText(doc) {
    const comp = doc.replace(/\r/g, '');
    return comp.split('\n');
}
exports.splitText = splitText;
/**
 * Returns only the text located in the comment if there is one in the provided line.
 * @param {string} 	line 						the line to be read
 * @param {array} 	testArray				the array of Regular Expressions to test
 * @param {boolean}	match_multiple	If true the string will continue to test expressions in the array.
 * @returns {array} Returns an array of objects[{type:<expression index>, text:<text found>, index:<where found>, length:<length of string>}]
 */
function testArray(line, type, tests, names, match_multiple = false) {
    let ret = [];
    const testArraySize = tests === undefined || tests === null ? 0 : tests.length;
    for (let x = 0; x < testArraySize; x++) {
        const regex = tests[x];
        const res = runRegExTest(line, regex);
        if (res.length > 0) {
            res.forEach(e => {
                e.result_name = names[x];
                e.type = type;
            });
            ret = ret.concat(res);
            if (!match_multiple) {
                break;
            }
        }
    }
    return ret;
}
function runRegExTest(article, test) {
    //console.log(`Testing article: ${article}\nTest: ${test}`)
    if (test === null || test === undefined || test === "" || testBlankLine(article)) {
        return [];
    }
    let m;
    let x = 0;
    const ret = [];
    while ((m = test.exec(article)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === test.lastIndex) {
            test.lastIndex++;
        }
        if (x > 100) {
            console.log('Loop count error');
            break;
        }
        x++;
        // The result can be accessed through the `m`-variable.			
        const cmt = {
            token: m[0],
            index: m.index,
            len: m[0].length
        };
        ret.push(cmt);
    }
    //console.log(`RegExp test returning: ${JSON.stringify(ret)}`)
    return ret;
}
//# sourceMappingURL=utilities.js.map