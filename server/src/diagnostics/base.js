import {	
	Diagnostic,
	DiagnosticSeverity,		
	DiagnosticRelatedInformation, 
	Range, 
	Position,
	Location
} from 'vscode-languageserver/node';
/**Class for diagnostic related information */
class Related {
	#document;
	#message;
	#range;
	/**
	 * 
	 * @param {DocumentUri} document 	The document URI for the related information
	 * @param {Range} range 					The location in the document for the related information
	 * @param {string} message 				The related information message
	 */
	constructor(document,range,message){
		this.#document = document;
		this.#range = range;
		this.#message = message;
	}
	/**
	 * Gets the diagnostic related information
	 * @returns {DiagnosticRelatedInformation} Returns the diagnostic information
	 */
	get related_info(){
		const r = new DiagnosticRelatedInformation();
		const l = new Location();
		l.uri = this.#document;
		l.range = this.#range;
		r.location=l;
		r.message=this.#message;
		return r;
	}
}
/**
 * Base class for diagnostic messages * 
 */
export class BaseDiagnostic {
	#range;
	#severity;
	#message;
	#related_info;
	/**
	 * Create a basic diagnostic
	 * @param {Range} range 								The range for the diagnostic token
	 * @param {DiagnosticSeverity} severity The diagnostic severity (DiagnosticSeverity.Error,...)
	 * @param {string} message 							The message to be displayed with the diagnostic information	
	 * @param {Related[]} related_info			(Optional) An array containing related information
	 */
	constructor(range,severity,message,related_info=null){
		this.#range = range;
		this.#severity = severity;
		this.#message = message;	
		this.#related_info = related_info;	
	}
	/**
	 * Gets the diagnostic information to be published
	 * @returns {Diagnostic} A Diagnostic object to be consumed by the language server
	 */
	get GetInfo(){
		const ret = new Diagnostic();
		ret.range = this.#range;
		ret.severity = this.#severity;
		ret.message = this.#message;
		if(this.#related_info!==null){
			ret.DiagnosticRelatedInformation = [];
			this.#related_info.forEach((e)=> {
				ret.DiagnosticRelatedInformation.push(e.related_info);
			});			
		}
		return ret;
	}
}
/**
 * 
 * @param {number} start_line The starting line of the diagnostic range
 * @param {number} start_char The starting character of the diagnostic range
 * @param {number} end_line 	The end line of the diagnostic range
 * @param {number} end_char 	The end character of the diagnostic range
 * @returns {Range}						A range object
 */
function createRange(start_line,start_char,end_line,end_char){
	const start_loc = new Position();
	const end_loc = new Position();
	start_loc.line = start_line;
	start_loc.character = start_char;
	if(end_line===0){
		end_loc.line = start_line;
		end_loc.character = start_char+error_str.length;
	} else {
		end_loc.line = end_line;
		end_loc.character = end_char;
	}
	const range = new Range();
	range.start = start_loc;
	range.end = end_loc;
	return range;
}
function readLocation(location){
	const start_line = location.start_line;
	const start_char = location.start_char;
	const end_line = location.hasOwnProperty('end_line')?location.end_line:location.start_line;
	const end_char = location.hasOwnProperty('end_char')?location.end_char:location.start_char;
	return createRange(start_line,start_char,end_line,end_char);
}
function createRelated(related_info){
	const ret = [];
	for(const i of related_info){
		const range = readLocation(i.location)
		const r = new Related(i.uri,range,i.message);
		ret.push(r.related_info);
	}
	return ret;
}

export function createError(location, message, related_info=null){
	const related = related_info===null?null:createRelated(related_info);
	const range = readLocation(location);
	const diag = new BaseDiagnostic(range,DiagnosticSeverity.Error, message,related)
	return diag.GetInfo;
}
export function createWarning(){
	const related = related_info===null?null:createRelated(related_info);
	const range = readLocation(location);
	const diag = new BaseDiagnostic(range,DiagnosticSeverity.Warning, message,related)
	return diag.GetInfo;
}
export function createInfo(){
	const related = related_info===null?null:createRelated(related_info);
	const range = readLocation(location);
	const diag = new BaseDiagnostic(range,DiagnosticSeverity.Information, message,related)
	return diag.GetInfo;
}
