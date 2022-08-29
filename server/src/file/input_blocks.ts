"use strict";
import { Range, Position } from 'vscode-languageserver';
import { EventEmitter } from 'vscode';
export class InputBlocks {
	private range:Range;
	private block_id:string = "";
	private type:string = "";
	private parameters:Parameters[] = [];
	constructor(type, range:Range){
		this.type = type;
		this.range = range;
	}

}

interface Parameters {
	type: string;
	value:string|number;
	
	position: Position;
}

