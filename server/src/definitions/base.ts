"use strict";

export interface UserInput<T> {
	id:string,
	input_str:string,
	params?:UserParameter[],	
	location:string,
	input_type:T
}

export interface UserParameter {	
	readonly id:string,
	readonly name:string,	
	readonly isRequired:boolean,
	readonly regex:RegExp,
	isValid(str:string):boolean,		
	readonly description:string,
	readonly notes:string[]
}

interface inputs {
	isValidInput(str):boolean
}

class InputCard {

	isValidInput(str:string):boolean{
		return str!=="";
	}
}

let ui:UserInput<InputCard> = {
	input_type:
}