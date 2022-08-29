"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lat = void 0;
const card_1 = require("../card");
const def = "";
const des = "lattice definition";
const c_type = "";
class Lat extends card_1.Card {
    constructor(file_uri, start_pos) {
        super(file_uri, c_type, def, des, start_pos);
    }
    /**
     * Checks to see if the card as written is currently valid
     * @returns {array} An empty array if no issues, or an array of diagnostic tokens
     */
    isValidCard() {
        return [];
    }
    /**
     * Checks to see if a card can be created from the given input
     * @param {string} input A string describing the card to be created
     * @returns {Card} Returns a card of the proper type if it is valid, otherwise returns null
     */
    static CanCreateCard(input) {
        return null;
    }
}
exports.Lat = Lat;
//# sourceMappingURL=lat.js.map