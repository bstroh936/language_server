"use strict";
import { Line } from "./line";
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
export class FileManager {
	static #file_trees = [];

	/**
	 * Gets the semantic tokens for the designated file
	 * @returns {number[]} Semantic token array
	 */
	get SemanticTokens(){
		

	}
	/**
	 * Gets the diagnostic tokens for the active file. If no active file is set, it will return the tokens for the last file in the array
	 * @returns {Diagnostic[]} An array of diagnostic tokens for the server to consume
	 */
	get DiagnosticTokens(){

	}
	set ActiveFile(file_uri){

	}
	/**
	 * Reads in a new document to the file manager
	 * @param {TextDocumentItem}
	 */
	set AddNewFile(file){
		//{"textDocument":{"uri":"file:///c%3A/Users/TheTOP/Desktop/tt.spnt",
		//"languageId":"serpent","version":1,"text":"AAAB\r\n\r\n123\r\nSS\r\n"}}

	}
	/**
	 * Reads in an incremental update to a file
	 * @param {DidChangeTextDocumentParams}
	 */
	set IncrementalUpdate(incremental){

	}
	static closeFile(file_uri)
	/**
	 * Deletes a file from the file tree
	 * @param {string} file_uri the file to delete
	 * 
	 */
	static deleteFile(file_uri){

	}
}

class TextFile {
	#file_uri;
	#input_blocks;
	#universe_ids;
	#cell_ids;
	#surf_ids;
	#mat_ids;
	#det_ids;
	#src_ids;
	#is_open;
	/**
	 * Creates a new file object
	 * @param {string} uri The document uri
	 */
	constructor(uri, is_open){
		this.#file_uri=uri;
		this.#input_blocks=[];
		this.#universe_ids=[];
		this.#cell_ids=[];
		this.#surf_ids=[];
		this.#mat_ids=[];
		this.#det_ids=[];
		this.#src_ids=[];
		this.#is_open = is_open;
	}
}