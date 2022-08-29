"use strict";
import {testBlankLine,check_tokens,sortTokens,removeTokens,displayOnlyToken} from '../utilities/utilities';
const std_tests = ['comment','syntax','command']

export class Line {	
	#line_num=0;
	#tokens=[];
	#is_open_file=true;
	constructor(line_num){
		this.#line_num = line_num;			
	}
	updateLineToken(token_params){
		for(const t of token_params){
			const old_token = t.old_token;
			const new_token = t.new_token;
			const id = this.#tokens.findIndex((e)=>{
				return (
					e.token_id===old_token.token_id&&
					e.line_num===old_token.line_num&&
					e.line_pos===old_token.line_pos&&
					e.token_len===old_token.token_len&&
					e.token_type===old_token.token_type);				
			});
			if(id!==-1){
				this.#tokens.splice(id,1,new_token);
			}			
		}
		const ret = sortTokens(this.#tokens);	
		return ret.flat(2);			
	}

	readLine(text){							
		if(testBlankLine(text)){return [];}
		let line = text;		
		for(const t of std_tests){
			line = this.#registerTokens(check_tokens(t,line),line);
		}						
		const tokens = this.#tokens.map(l=>{					
			if(displayOnlyToken(l.result_name)&&!this.#is_open_file){
				return null
			}
			return {
				token_id: l.result_name,
				line_num:this.#line_num,
				line_pos:l.index,
				token_len: l.len,
				token_type:l.type
			}
		});
		const ret = sortTokens(tokens);	
		return ret.flat(2);
	}
	#registerTokens(tokens,text){
		if(tokens.length>0){
			let line = text;			
			tokens.forEach(com=>{				
				line= removeTokens(line,com.token);			
			})						
			this.#tokens = this.#tokens.concat(tokens);
		}
		return line;
	}
}
class FileTree {
	#file_tokens = [];
	#included_files = [];
	#file_id;
	constructor(file_id){
		this.#file_id = file_id;		
	}
	/**Adds a universe to the file
	 * @param {number} universe the universe to add
	 * @return {boolean} Returns true if the universe was added and false if it was not
	 *  
	 **/
	static createUniverse(universe){
		if(!this._universes.includes(universe)){
			this._universes.push(universe);
			return true
		}
		return false
	}
}
function CreateFileBlocks(file_tokens){
	const ret_input = [new InputBlock("","",0,0)];	
	const bl_cm = [];	
	for(const token of file_tokens){				
		if(isBlockCommentClosed(bl_cm)){			
			if(testBlockOpen(token)){
				const open = {
					line:token.line_num,
					pos:token.line_pos
				};
				bl_cm.push([open]);
			}			
			const new_id = token.token_id;
			if(checkCommands(new_id)){
				const prev_block = ret_input.pop();
				const new_line = token.line_num;
				const new_pos = token.line_pos;
				const new_block = new InputBlock(new_id,new_line,new_pos);
				prev_block.closeBlock(new_line,new_pos);
				ret_input.push(prev_block);
				ret_input.push(new_block);
			}				
		} else {
			if(testBlockClosed(token)){
				const close = {
					line:token.line_num,
					pos:token.line_pos + token.token_len
				};
				const last_bl = bl_cm[-1];
				last_bl.push(close);
				bl_cm.splice(-1,1,last_bl);
			}
		}									
	}
	return {
		file_blocks:ret_input,
		comment_blocks:bl_cm
	};
}
function ReadFile(text_document, is_opened){	
	const ret = [];	
	const text = splitText(text_document);
	for(let x=0;x<text.length;x++){
		const line = new Line(x, is_opened);		
		const tokens = line.readLine(text[x]);		
		tokens.forEach(e=>{
			if(e!==null&&e!==undefined){
				ret.push(e);
			}
		});
	}	
	return ret.flat(2);
}
class InputBlock {
	#start_pos;
	#end_pos = {line:0,pos:0};	
	#block_id = "";	
	constructor(id, line, pos){
		this.#block_id = id;
		this.#start_pos = {line:line,pos:pos};		
	}
	closeBlock(new_line, new_pos){
		const end_pos = new_pos>0?new_pos-1:-1;
		const end_line = end_pos===-1?new_line-1:new_line;
		this.#end_pos = {line:end_line,pos:end_pos};
	}
	getBlockType(){
		return this.#block_id;
	}
	getBlockRange(){
		return {
			start:this.#start_pos,
			end:this.#end_pos
		}
	}
	isClosed(){
		return this.#end_pos!=={line:0,pos:0};
	}	
	isInRange(line, pos){
		const test_pos = {line:line,pos:pos};
		const pos_1 = this.#start_pos;		
		const after_start = testTokenPos(pos_1,test_pos);
		if(this.isClosed()){
			const pos_2 = this.#end_pos;	
			if(pos_2.pos===-1){pos_2.pos = 1000;}
			const before_end = testTokenPos(test_pos,pos_2);
			return after_start&&before_end;
		} else {
			return after_start;
		}
	}
}
function testBlockOpen(token){
		if(token===null||token===undefined||token===[]){return false;}		
		return token.token_id==='block-start';
	}
function testBlockClosed(token){
		if(token===null||token===undefined||token===[]){return false;}		
		return token.token_id==='block-end';
	}
function isBlockCommentClosed(block_list){
	if(block_list===[]){return true;}
	const last_bl = block_list[-1];
	const o = last_bl[0];
	const c = last_bl[-1];
	return ((o!==c)&&testTokenPos(c,o))
}


function checkIdDoesExist(id, type=''){
	switch (type){
		case 'cel':
			return IsExisting(id,cell_ids);
		case 'sur':
			return IsExisting(id,surf_ids);
		case 'mat':
			return IsExisting(id,mat_ids);
		case 'det':
			return IsExisting(id,det_ids);
		case 'src':
			return IsExisting(id,src_ids);
		case '':
		default:
			return IsExisting(id,universe_ids);
	}
}
function IsExisting(id, chk){
	return chk.includes(id);
}