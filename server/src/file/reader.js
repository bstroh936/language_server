"use strict"


export class Reader {
	/**
	 * Reads a file and returns the tokenized information to the file manager
	 * @param {TextDocumentItem} file 
	 * 
	 */
	static ReadFile(file){

	}
	static ReadPartial(param){

	}
}
/**
 * Deletes text from the document
 */
function deleteUpdate(){

}
/**
 * Inserts text into the document. The inserted text may overwrite existing text or be new
 */
function insertUpdate(){

}
/**
 * Adds new text at the end of the document
 */
function addUpdate(){

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



export class ReadBuffer {
	static #bufferText = "";
	static #start_line = 0;
	static #start_pos = 0;
	static #buffer_doc = "";

	static WriteToBuffer(text){
		const doc_uri = params.textDocument.uri;
		const contentChanges = text.contentChanges[0];
		const change_range = contentChanges.range;
		const range_length = contentChanges.rangeLength;
		const change_text = contentChanges.text;
			
	}
	static #ShouldFlushBuffer(new_text){
		//does new text complete a semantic token?

		//does new text delete part of an existing token or card?

		//does new text add a line or space?
		
		//is buffer getting to large?
		if(this.#bufferText.length>10){return true;}
	}
	static #DidFlushBuffer(){
		
	}
}