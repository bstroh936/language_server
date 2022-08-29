"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _DiagnosticToken_message, _DiagnosticToken_severity, _DiagnosticToken_related;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticToken = void 0;
const base_token_1 = require("./base_token");
class DiagnosticToken extends base_token_1.Token {
    constructor(token_info, message, severity, related = null) {
        super(token_info.token_id, token_info.token_len, token_info.token_type, token_info.token_supertype, token_info.start_line, token_info.start_char);
        _DiagnosticToken_message.set(this, void 0);
        _DiagnosticToken_severity.set(this, void 0);
        _DiagnosticToken_related.set(this, void 0);
        __classPrivateFieldSet(this, _DiagnosticToken_message, message, "f");
        __classPrivateFieldSet(this, _DiagnosticToken_severity, severity, "f");
        __classPrivateFieldSet(this, _DiagnosticToken_related, related, "f");
    }
}
exports.DiagnosticToken = DiagnosticToken;
_DiagnosticToken_message = new WeakMap(), _DiagnosticToken_severity = new WeakMap(), _DiagnosticToken_related = new WeakMap();
function SyntaxToken() {
    const token = new DiagnosticToken();
}
//# sourceMappingURL=diagnostic_token.js.map