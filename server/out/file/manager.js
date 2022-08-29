"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _FileManager_file_trees, _TextFile_file_uri, _TextFile_input_blocks, _TextFile_universe_ids, _TextFile_cell_ids, _TextFile_surf_ids, _TextFile_mat_ids, _TextFile_det_ids, _TextFile_src_ids, _TextFile_is_open;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
//incremental updates read until space or new line char
//flush to card generator, current card, or relevant card at edit location
//cards need to provide is complete, is correct and internal diagnostics
//token types should be 'word' definitions ie, text, numbers, quotes, comments
/* new ling char = '\r\n'

    Adding a letter:
    {
     "textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt","version":2},
 * "contentChanges":[{"range":
        {"start":{"line":4,"character":0},
         "end":{"line":4,"character":0}},
         "rangeLength":0,"text":"k"}]}
    removing a char:
    {"textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt","version":3},"contentChanges":[{"range":{"start":{"line":4,"character":3},"end":{"line":5,"character":0}},"rangeLength":2,"text":""}]}
    */
class FileManager {
    /**
     * Gets the semantic tokens for the designated file
     * @returns {number[]} Semantic token array
     */
    get SemanticTokens() {
    }
    /**
     * Gets the diagnostic tokens for the active file. If no active file is set, it will return the tokens for the last file in the array
     * @returns {Diagnostic[]} An array of diagnostic tokens for the server to consume
     */
    get DiagnosticTokens() {
    }
    set ActiveFile(file_uri) {
    }
    /**
     * Reads in a new document to the file manager
     * @param {TextDocumentItem}
     */
    set AddNewFile(file) {
        //{"textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt",
        //"languageId":"serpent","version":1,"text":"AAAB\r\n\r\n123\r\nSS\r\n"}}
    }
    /**
     * Reads in an incremental update to a file
     * @param {DidChangeTextDocumentParams}
     */
    set IncrementalUpdate(incremental) {
    }
    /**
     * Deletes a file from the file tree
     * @param {string} file_uri the file to delete
     *
     */
    static deleteFile(file_uri) {
    }
}
exports.FileManager = FileManager;
_a = FileManager;
_FileManager_file_trees = { value: [] };
class TextFile {
    /**
     * Creates a new file object
     * @param {string} uri The document uri
     */
    constructor(uri, is_open) {
        _TextFile_file_uri.set(this, void 0);
        _TextFile_input_blocks.set(this, void 0);
        _TextFile_universe_ids.set(this, void 0);
        _TextFile_cell_ids.set(this, void 0);
        _TextFile_surf_ids.set(this, void 0);
        _TextFile_mat_ids.set(this, void 0);
        _TextFile_det_ids.set(this, void 0);
        _TextFile_src_ids.set(this, void 0);
        _TextFile_is_open.set(this, void 0);
        __classPrivateFieldSet(this, _TextFile_file_uri, uri, "f");
        __classPrivateFieldSet(this, _TextFile_input_blocks, [], "f");
        __classPrivateFieldSet(this, _TextFile_universe_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_cell_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_surf_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_mat_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_det_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_src_ids, [], "f");
        __classPrivateFieldSet(this, _TextFile_is_open, is_open, "f");
    }
}
_TextFile_file_uri = new WeakMap(), _TextFile_input_blocks = new WeakMap(), _TextFile_universe_ids = new WeakMap(), _TextFile_cell_ids = new WeakMap(), _TextFile_surf_ids = new WeakMap(), _TextFile_mat_ids = new WeakMap(), _TextFile_det_ids = new WeakMap(), _TextFile_src_ids = new WeakMap(), _TextFile_is_open = new WeakMap();
//# sourceMappingURL=manager.js.map