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
var _Line_instances, _Line_line_num, _Line_tokens, _Line_is_open_file, _Line_registerTokens, _FileTree_file_tokens, _FileTree_included_files, _FileTree_file_id, _InputBlock_start_pos, _InputBlock_end_pos, _InputBlock_block_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const utilities_1 = require("../utilities/utilities");
const std_tests = ['comment', 'syntax', 'command'];
class Line {
    constructor(line_num) {
        _Line_instances.add(this);
        _Line_line_num.set(this, 0);
        _Line_tokens.set(this, []);
        _Line_is_open_file.set(this, true);
        __classPrivateFieldSet(this, _Line_line_num, line_num, "f");
    }
    updateLineToken(token_params) {
        for (const t of token_params) {
            const old_token = t.old_token;
            const new_token = t.new_token;
            const id = __classPrivateFieldGet(this, _Line_tokens, "f").findIndex((e) => {
                return (e.token_id === old_token.token_id &&
                    e.line_num === old_token.line_num &&
                    e.line_pos === old_token.line_pos &&
                    e.token_len === old_token.token_len &&
                    e.token_type === old_token.token_type);
            });
            if (id !== -1) {
                __classPrivateFieldGet(this, _Line_tokens, "f").splice(id, 1, new_token);
            }
        }
        const ret = (0, utilities_1.sortTokens)(__classPrivateFieldGet(this, _Line_tokens, "f"));
        return ret.flat(2);
    }
    readLine(text) {
        if ((0, utilities_1.testBlankLine)(text)) {
            return [];
        }
        let line = text;
        for (const t of std_tests) {
            line = __classPrivateFieldGet(this, _Line_instances, "m", _Line_registerTokens).call(this, (0, utilities_1.check_tokens)(t, line), line);
        }
        const tokens = __classPrivateFieldGet(this, _Line_tokens, "f").map(l => {
            if ((0, utilities_1.displayOnlyToken)(l.result_name) && !__classPrivateFieldGet(this, _Line_is_open_file, "f")) {
                return null;
            }
            return {
                token_id: l.result_name,
                line_num: __classPrivateFieldGet(this, _Line_line_num, "f"),
                line_pos: l.index,
                token_len: l.len,
                token_type: l.type
            };
        });
        const ret = (0, utilities_1.sortTokens)(tokens);
        return ret.flat(2);
    }
}
exports.Line = Line;
_Line_line_num = new WeakMap(), _Line_tokens = new WeakMap(), _Line_is_open_file = new WeakMap(), _Line_instances = new WeakSet(), _Line_registerTokens = function _Line_registerTokens(tokens, text) {
    if (tokens.length > 0) {
        let line = text;
        tokens.forEach(com => {
            line = (0, utilities_1.removeTokens)(line, com.token);
        });
        __classPrivateFieldSet(this, _Line_tokens, __classPrivateFieldGet(this, _Line_tokens, "f").concat(tokens), "f");
    }
    return line;
};
class FileTree {
    constructor(file_id) {
        _FileTree_file_tokens.set(this, []);
        _FileTree_included_files.set(this, []);
        _FileTree_file_id.set(this, void 0);
        __classPrivateFieldSet(this, _FileTree_file_id, file_id, "f");
    }
    /**Adds a universe to the file
     * @param {number} universe the universe to add
     * @return {boolean} Returns true if the universe was added and false if it was not
     *
     **/
    static createUniverse(universe) {
        if (!this._universes.includes(universe)) {
            this._universes.push(universe);
            return true;
        }
        return false;
    }
}
_FileTree_file_tokens = new WeakMap(), _FileTree_included_files = new WeakMap(), _FileTree_file_id = new WeakMap();
function CreateFileBlocks(file_tokens) {
    const ret_input = [new InputBlock("", "", 0, 0)];
    const bl_cm = [];
    for (const token of file_tokens) {
        if (isBlockCommentClosed(bl_cm)) {
            if (testBlockOpen(token)) {
                const open = {
                    line: token.line_num,
                    pos: token.line_pos
                };
                bl_cm.push([open]);
            }
            const new_id = token.token_id;
            if (checkCommands(new_id)) {
                const prev_block = ret_input.pop();
                const new_line = token.line_num;
                const new_pos = token.line_pos;
                const new_block = new InputBlock(new_id, new_line, new_pos);
                prev_block.closeBlock(new_line, new_pos);
                ret_input.push(prev_block);
                ret_input.push(new_block);
            }
        }
        else {
            if (testBlockClosed(token)) {
                const close = {
                    line: token.line_num,
                    pos: token.line_pos + token.token_len
                };
                const last_bl = bl_cm[-1];
                last_bl.push(close);
                bl_cm.splice(-1, 1, last_bl);
            }
        }
    }
    return {
        file_blocks: ret_input,
        comment_blocks: bl_cm
    };
}
function ReadFile(text_document, is_opened) {
    const ret = [];
    const text = splitText(text_document);
    for (let x = 0; x < text.length; x++) {
        const line = new Line(x, is_opened);
        const tokens = line.readLine(text[x]);
        tokens.forEach(e => {
            if (e !== null && e !== undefined) {
                ret.push(e);
            }
        });
    }
    return ret.flat(2);
}
class InputBlock {
    constructor(id, line, pos) {
        _InputBlock_start_pos.set(this, void 0);
        _InputBlock_end_pos.set(this, { line: 0, pos: 0 });
        _InputBlock_block_id.set(this, "");
        __classPrivateFieldSet(this, _InputBlock_block_id, id, "f");
        __classPrivateFieldSet(this, _InputBlock_start_pos, { line: line, pos: pos }, "f");
    }
    closeBlock(new_line, new_pos) {
        const end_pos = new_pos > 0 ? new_pos - 1 : -1;
        const end_line = end_pos === -1 ? new_line - 1 : new_line;
        __classPrivateFieldSet(this, _InputBlock_end_pos, { line: end_line, pos: end_pos }, "f");
    }
    getBlockType() {
        return __classPrivateFieldGet(this, _InputBlock_block_id, "f");
    }
    getBlockRange() {
        return {
            start: __classPrivateFieldGet(this, _InputBlock_start_pos, "f"),
            end: __classPrivateFieldGet(this, _InputBlock_end_pos, "f")
        };
    }
    isClosed() {
        return __classPrivateFieldGet(this, _InputBlock_end_pos, "f") !== { line: 0, pos: 0 };
    }
    isInRange(line, pos) {
        const test_pos = { line: line, pos: pos };
        const pos_1 = __classPrivateFieldGet(this, _InputBlock_start_pos, "f");
        const after_start = testTokenPos(pos_1, test_pos);
        if (this.isClosed()) {
            const pos_2 = __classPrivateFieldGet(this, _InputBlock_end_pos, "f");
            if (pos_2.pos === -1) {
                pos_2.pos = 1000;
            }
            const before_end = testTokenPos(test_pos, pos_2);
            return after_start && before_end;
        }
        else {
            return after_start;
        }
    }
}
_InputBlock_start_pos = new WeakMap(), _InputBlock_end_pos = new WeakMap(), _InputBlock_block_id = new WeakMap();
function testBlockOpen(token) {
    if (token === null || token === undefined || token === []) {
        return false;
    }
    return token.token_id === 'block-start';
}
function testBlockClosed(token) {
    if (token === null || token === undefined || token === []) {
        return false;
    }
    return token.token_id === 'block-end';
}
function isBlockCommentClosed(block_list) {
    if (block_list === []) {
        return true;
    }
    const last_bl = block_list[-1];
    const o = last_bl[0];
    const c = last_bl[-1];
    return ((o !== c) && testTokenPos(c, o));
}
function checkIdDoesExist(id, type = '') {
    switch (type) {
        case 'cel':
            return IsExisting(id, cell_ids);
        case 'sur':
            return IsExisting(id, surf_ids);
        case 'mat':
            return IsExisting(id, mat_ids);
        case 'det':
            return IsExisting(id, det_ids);
        case 'src':
            return IsExisting(id, src_ids);
        case '':
        default:
            return IsExisting(id, universe_ids);
    }
}
function IsExisting(id, chk) {
    return chk.includes(id);
}
//# sourceMappingURL=line.js.map