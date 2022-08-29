"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Related_document, _Related_message, _Related_range, _BaseDiagnostic_range, _BaseDiagnostic_severity, _BaseDiagnostic_message, _BaseDiagnostic_related_info;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfo = exports.createWarning = exports.createError = exports.BaseDiagnostic = void 0;
const node_1 = require("vscode-languageserver/node");
/**Class for diagnostic related information */
class Related {
    /**
     *
     * @param {DocumentUri} document 	The document URI for the related information
     * @param {Range} range 					The location in the document for the related information
     * @param {string} message 				The related information message
     */
    constructor(document, range, message) {
        _Related_document.set(this, void 0);
        _Related_message.set(this, void 0);
        _Related_range.set(this, void 0);
        __classPrivateFieldSet(this, _Related_document, document, "f");
        __classPrivateFieldSet(this, _Related_range, range, "f");
        __classPrivateFieldSet(this, _Related_message, message, "f");
    }
    /**
     * Gets the diagnostic related information
     * @returns {DiagnosticRelatedInformation} Returns the diagnostic information
     */
    get related_info() {
        const r = new node_1.DiagnosticRelatedInformation();
        const l = new node_1.Location();
        l.uri = __classPrivateFieldGet(this, _Related_document, "f");
        l.range = __classPrivateFieldGet(this, _Related_range, "f");
        r.location = l;
        r.message = __classPrivateFieldGet(this, _Related_message, "f");
        return r;
    }
}
_Related_document = new WeakMap(), _Related_message = new WeakMap(), _Related_range = new WeakMap();
/**
 * Base class for diagnostic messages *
 */
class BaseDiagnostic {
    /**
     * Create a basic diagnostic
     * @param {Range} range 								The range for the diagnostic token
     * @param {DiagnosticSeverity} severity The diagnostic severity (DiagnosticSeverity.Error,...)
     * @param {string} message 							The message to be displayed with the diagnostic information
     * @param {Related[]} related_info			(Optional) An array containing related information
     */
    constructor(range, severity, message, related_info = null) {
        _BaseDiagnostic_range.set(this, void 0);
        _BaseDiagnostic_severity.set(this, void 0);
        _BaseDiagnostic_message.set(this, void 0);
        _BaseDiagnostic_related_info.set(this, void 0);
        __classPrivateFieldSet(this, _BaseDiagnostic_range, range, "f");
        __classPrivateFieldSet(this, _BaseDiagnostic_severity, severity, "f");
        __classPrivateFieldSet(this, _BaseDiagnostic_message, message, "f");
        __classPrivateFieldSet(this, _BaseDiagnostic_related_info, related_info, "f");
    }
    /**
     * Gets the diagnostic information to be published
     * @returns {Diagnostic} A Diagnostic object to be consumed by the language server
     */
    get GetInfo() {
        const ret = new node_1.Diagnostic();
        ret.range = __classPrivateFieldGet(this, _BaseDiagnostic_range, "f");
        ret.severity = __classPrivateFieldGet(this, _BaseDiagnostic_severity, "f");
        ret.message = __classPrivateFieldGet(this, _BaseDiagnostic_message, "f");
        if (__classPrivateFieldGet(this, _BaseDiagnostic_related_info, "f") !== null) {
            ret.DiagnosticRelatedInformation = [];
            __classPrivateFieldGet(this, _BaseDiagnostic_related_info, "f").forEach((e) => {
                ret.DiagnosticRelatedInformation.push(e.related_info);
            });
        }
        return ret;
    }
}
exports.BaseDiagnostic = BaseDiagnostic;
_BaseDiagnostic_range = new WeakMap(), _BaseDiagnostic_severity = new WeakMap(), _BaseDiagnostic_message = new WeakMap(), _BaseDiagnostic_related_info = new WeakMap();
/**
 *
 * @param {number} start_line The starting line of the diagnostic range
 * @param {number} start_char The starting character of the diagnostic range
 * @param {number} end_line 	The end line of the diagnostic range
 * @param {number} end_char 	The end character of the diagnostic range
 * @returns {Range}						A range object
 */
function createRange(start_line, start_char, end_line, end_char) {
    const start_loc = new node_1.Position();
    const end_loc = new node_1.Position();
    start_loc.line = start_line;
    start_loc.character = start_char;
    if (end_line === 0) {
        end_loc.line = start_line;
        end_loc.character = start_char + error_str.length;
    }
    else {
        end_loc.line = end_line;
        end_loc.character = end_char;
    }
    const range = new node_1.Range();
    range.start = start_loc;
    range.end = end_loc;
    return range;
}
function readLocation(location) {
    const start_line = location.start_line;
    const start_char = location.start_char;
    const end_line = location.hasOwnProperty('end_line') ? location.end_line : location.start_line;
    const end_char = location.hasOwnProperty('end_char') ? location.end_char : location.start_char;
    return createRange(start_line, start_char, end_line, end_char);
}
function createRelated(related_info) {
    const ret = [];
    for (const i of related_info) {
        const range = readLocation(i.location);
        const r = new Related(i.uri, range, i.message);
        ret.push(r.related_info);
    }
    return ret;
}
function createError(location, message, related_info = null) {
    const related = related_info === null ? null : createRelated(related_info);
    const range = readLocation(location);
    const diag = new BaseDiagnostic(range, node_1.DiagnosticSeverity.Error, message, related);
    return diag.GetInfo;
}
exports.createError = createError;
function createWarning() {
    const related = related_info === null ? null : createRelated(related_info);
    const range = readLocation(location);
    const diag = new BaseDiagnostic(range, node_1.DiagnosticSeverity.Warning, message, related);
    return diag.GetInfo;
}
exports.createWarning = createWarning;
function createInfo() {
    const related = related_info === null ? null : createRelated(related_info);
    const range = readLocation(location);
    const diag = new BaseDiagnostic(range, node_1.DiagnosticSeverity.Information, message, related);
    return diag.GetInfo;
}
exports.createInfo = createInfo;
//# sourceMappingURL=base.js.map