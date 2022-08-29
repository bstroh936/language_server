"use strict";

export class Token {
	#token_id;
	#token_type;
	#token_super_type;
	#location = {start_line:0,start_char:0,end_line:0,end_char:0}
	#token_modifiers;
	#token_len;
	constructor(token_id, token_len, token_type,token_supertype,start_line, start_char, modifiers=[]){
		if (this.constructor === Token) {
      throw new Error('Class "Token" cannot be instantiated')
    }
		this.#token_id = token_id;
		this.#token_type = token_type;
		this.#token_super_type=token_supertype;
		this.#location.start_line=start_line;
		this.#location.start_char=start_char;
		this.#token_modifiers=modifiers;
		this.#token_len=token_len;
	}
	set endLoc(loc){
		this.#location.end_line=loc.line;
		this.#location.end_char=loc.char;
	}	
	get toObj(){
		return (
			{	token_id:this.#token_id,
					type:this.#token_type,
					supertype:this.#token_super_type,
					location:{
						start:{line:this.#location.start_line, char:this.#location.start_char},
						end:{line:this.#location.end_line, char:this.#location.end_char}
					},
					modifiers:this.#token_modifiers,
					length:this.#token_len,
			}
		);
	}		
}
