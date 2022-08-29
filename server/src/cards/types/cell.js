//cell definition

import { Card } from "../card";
const def = "/*something about cells"
const des = "cell definition"
const c_type = "cel"
export class Cell extends Card {	
	static _id_list = [];
	constructor(file_uri,start_pos){
		super(file_uri,c_type,def,des,start_pos);
			
	}
	/**
	 * Checks to see if the card as written is currently valid
	 * @returns {array} An empty array if no issues, or an array of diagnostic tokens
	 */	
	isValidCard(){
		
		return [];
	}
	/**
	 * Checks to see if a card can be created from the given input
	 * @param {string} input A string describing the card to be created
	 * @returns {Card} Returns a card of the proper type if it is valid, otherwise returns null 
	 */
	static CanCreateCard(input){
		return null;
	}	
	/**
	 * Updates the card from the given input. If changes are made, all dependents will be re-verified
	 * @param {string} input A string describing the changes 
	 * @returns {array} An empty array if no issues, or an array of diagnostic tokens
	 */
	updateCard(input){
		return [];
	}
		/**
	 * Checks to see if the cell name has been declared
	 * @param {string} new_id The cell name to check for
	 * @returns {boolean} True if the cell is already named, false otherwise
	 */
	static isExisting(new_id){
		return this._id_list.includes(new_id);
	}


}