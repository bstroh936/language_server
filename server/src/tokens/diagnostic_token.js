"use strict";
import { Token } from "./base_token";

export class DiagnosticToken extends Token {
	#message;
	#severity;
	#related;
	constructor(token_info, message,severity,related=null ){		
		super(token_info.token_id, token_info.token_len, token_info.token_type,token_info.token_supertype,token_info.start_line, token_info.start_char )
		this.#message=message;
		this.#severity=severity;
		this.#related=related;
	}
}

function SyntaxToken(){
	const token = new DiagnosticToken();


}