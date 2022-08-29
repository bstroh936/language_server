"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUndefinedError = exports.createIncorrectParameterError = exports.createInvalidCommandError = exports.createDuplicateIdError = exports.createSyntaxError = void 0;
const base_1 = require("./base");
//errors:diagnostic severity = Error
/**
 * Creates a new syntax error object. If the end position is not provided
 * it will be assumed the error occurs on one line and the end position will be calculated
 * based on the lenght of the error string.
 * @param {number} start_line The line where the syntax error begins
 * @param {number} start_char The character position where the syntax error begins
 * @param {string} error_str 	The characters causing the syntax error
 * @param {number} end_line 	(Optional) The end line of the diagnostic range
 * @param {number} end_char 	(Optional) The end character of the diagnostic range
 * @returns The diagnostic object
 */
function createSyntaxError(token) {
    const start_line = location.start_line;
    const start_char = location.start_char;
    const end_line = location.hasOwnProperty('end_line') ? location.end_line : location.start_line;
    const end_char = location.hasOwnProperty('end_char') ? location.end_char : location.start_char;
    const message = `Only the characters a-z, A-Z, 0-9, ".", "-", spaces are permited in Serpent\nPlease remove the characters '${error_str}', or if they are correct you must either:\n\t-Enclose them within quotation marks, or\n\t-Enclose them within a comment`;
    return (0, base_1.createError)(location, message);
}
exports.createSyntaxError = createSyntaxError;
function createDuplicateIdError(start_line, start_pos, error_str, end_pos = null) {
}
exports.createDuplicateIdError = createDuplicateIdError;
function createInvalidCommandError(start_line, start_pos, error_str, end_pos = null) {
}
exports.createInvalidCommandError = createInvalidCommandError;
function createIncorrectParameterError(start_line, start_pos, error_str, end_pos = null) {
}
exports.createIncorrectParameterError = createIncorrectParameterError;
function createUndefinedError(start_line, start_pos, error_str, end_pos = null) {
}
exports.createUndefinedError = createUndefinedError;
//# sourceMappingURL=errors.js.map