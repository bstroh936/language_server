"use strict"
import { Line } from "./line";
import { splitText } from "../utilities/utilities";
/**
 * Read in the opened file
 * @param {string} file The file to be read
 * @returns {NodeTree} 	The abstract tree of the file, and any included files
 */
export async function ReadFile(file){
	const ret = [];	
	const text = splitText(file);
	for(let x=0;x<text.length;x++){
		const line = new Line(x);		
		const tokens = line.readLine(text[x]);		
		tokens.forEach(e=>{
			if(e!==null&&e!==undefined){
				ret.push(e);
			}
		});
	}	
	return ret.flat(2);
}

function ReadRefFile(file){
	return new Promise(function(resolve,reject){
		let fr = new FileReader();

		fr.onload = function(){
				resolve(fr.result);
		};
		fr.onerror = function(){
				reject(fr);
		};
		fr.readAsText(file);
	});
}

async function RegisterMultipleFiles(files){
	let readers = [];

	// Abort if there were no files selected
	if(!files.length) return;

	// Store promises in array
	for(const f of files){
			readers.push(ReadRefFile(f));
	}
	
	// Trigger Promises
	Promise.all(readers).then((values) => {
			// Values will be an array that contains an item
			// with the text of every selected file
			// ["File1 Content", "File2 Content" ... "FileN Content"]
			console.log(values);
	});
}

