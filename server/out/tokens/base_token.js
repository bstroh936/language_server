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
var _Token_token_id, _Token_token_type, _Token_token_super_type, _Token_location, _Token_token_modifiers, _Token_token_len;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(token_id, token_len, token_type, token_supertype, start_line, start_char, modifiers = []) {
        _Token_token_id.set(this, void 0);
        _Token_token_type.set(this, void 0);
        _Token_token_super_type.set(this, void 0);
        _Token_location.set(this, { start_line: 0, start_char: 0, end_line: 0, end_char: 0 });
        _Token_token_modifiers.set(this, void 0);
        _Token_token_len.set(this, void 0);
        if (this.constructor === Token) {
            throw new Error('Class "Token" cannot be instantiated');
        }
        __classPrivateFieldSet(this, _Token_token_id, token_id, "f");
        __classPrivateFieldSet(this, _Token_token_type, token_type, "f");
        __classPrivateFieldSet(this, _Token_token_super_type, token_supertype, "f");
        __classPrivateFieldGet(this, _Token_location, "f").start_line = start_line;
        __classPrivateFieldGet(this, _Token_location, "f").start_char = start_char;
        __classPrivateFieldSet(this, _Token_token_modifiers, modifiers, "f");
        __classPrivateFieldSet(this, _Token_token_len, token_len, "f");
    }
    set endLoc(loc) {
        __classPrivateFieldGet(this, _Token_location, "f").end_line = loc.line;
        __classPrivateFieldGet(this, _Token_location, "f").end_char = loc.char;
    }
    get toObj() {
        return ({ token_id: __classPrivateFieldGet(this, _Token_token_id, "f"),
            type: __classPrivateFieldGet(this, _Token_token_type, "f"),
            supertype: __classPrivateFieldGet(this, _Token_token_super_type, "f"),
            location: {
                start: { line: __classPrivateFieldGet(this, _Token_location, "f").start_line, char: __classPrivateFieldGet(this, _Token_location, "f").start_char },
                end: { line: __classPrivateFieldGet(this, _Token_location, "f").end_line, char: __classPrivateFieldGet(this, _Token_location, "f").end_char }
            },
            modifiers: __classPrivateFieldGet(this, _Token_token_modifiers, "f"),
            length: __classPrivateFieldGet(this, _Token_token_len, "f"),
        });
    }
}
exports.Token = Token;
_Token_token_id = new WeakMap(), _Token_token_type = new WeakMap(), _Token_token_super_type = new WeakMap(), _Token_location = new WeakMap(), _Token_token_modifiers = new WeakMap(), _Token_token_len = new WeakMap();
//# sourceMappingURL=base_token.js.map