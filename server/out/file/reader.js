"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _ReadBuffer_bufferText, _ReadBuffer_start_line, _ReadBuffer_start_pos, _ReadBuffer_buffer_doc, _ReadBuffer_ShouldFlushBuffer, _ReadBuffer_DidFlushBuffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBuffer = exports.Reader = void 0;
class Reader {
    /**
     * Reads a file and returns the tokenized information to the file manager
     * @param {TextDocumentItem} file
     *
     */
    static ReadFile(file) {
    }
    static ReadPartial(param) {
    }
}
exports.Reader = Reader;
/**
 * Deletes text from the document
 */
function deleteUpdate() {
}
/**
 * Inserts text into the document. The inserted text may overwrite existing text or be new
 */
function insertUpdate() {
}
/**
 * Adds new text at the end of the document
 */
function addUpdate() {
}
/* new ling char = '\r\n'

    Adding a letter:
    {
     "textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt","version":2},
 * "contentChanges":[
            {
                "range":
                {	"start":{"line":4,"character":0},
                    "end":{"line":4,"character":0}
                },
                "rangeLength":0,
                 "text":"k"
            }
        ]
    }
    removing a char:
    {"textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt","version":3},"contentChanges":[{"range":{"start":{"line":4,"character":3},"end":{"line":5,"character":0}},"rangeLength":2,"text":""}]}
    */
let params;
class ReadBuffer {
    static WriteToBuffer(text) {
        const doc_uri = params.textDocument.uri;
        const contentChanges = text.contentChanges[0];
        const change_range = contentChanges.range;
        const range_length = contentChanges.rangeLength;
        const change_text = contentChanges.text;
    }
}
exports.ReadBuffer = ReadBuffer;
_a = ReadBuffer, _ReadBuffer_ShouldFlushBuffer = function _ReadBuffer_ShouldFlushBuffer(new_text) {
    //does new text complete a semantic token?
    //does new text delete part of an existing token or card?
    //does new text add a line or space?
    //is buffer getting to large?
    if (__classPrivateFieldGet(this, _a, "f", _ReadBuffer_bufferText).length > 10) {
        return true;
    }
}, _ReadBuffer_DidFlushBuffer = function _ReadBuffer_DidFlushBuffer() {
};
_ReadBuffer_bufferText = { value: "" };
_ReadBuffer_start_line = { value: 0 };
_ReadBuffer_start_pos = { value: 0 };
_ReadBuffer_buffer_doc = { value: "" };
//# sourceMappingURL=reader.js.map