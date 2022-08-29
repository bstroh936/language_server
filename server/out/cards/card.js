"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(block_id, file_uri, card_type, definition, description, start_pos) {
        if (this.constructor === Card) {
            throw new Error('Class "Card" cannot be instantiated');
        }
        this._block_id = block_id;
        this._active = false;
        this._definition = definition;
        this._description = description;
        this._start_pos = start_pos;
        this._end_pos = start_pos;
        this._card_type = card_type;
        this._file_id = file_uri;
        this._depends_on = [];
        this._dependents = [];
    }
    static GetDescription() {
        return this._description;
    }
    static GetDefinition() {
        return this._definition;
    }
    static GetCardType() {
        return this._card_type;
    }
    /**Checks to see if a universe exists in the file
     * @param {number} universe the universe to check
     * @return {boolean} Does the universe current exist
     *
     **/
    static IsExistingUniverse(universe) {
        return this._universe_ids.includes(universe);
    }
    getCardRange() {
        return { start: this._start_pos, end: this._end_pos };
    }
    checkCardRange(range) {
        const chkEnd = range.end;
        const isAfter = (chkEnd.line < this._end_pos.line) || (chkEnd.line == this._end_pos.line && chkEnd.character == this._end_pos.character) ? true : false;
        const chkStart = range.start;
        const isBefore = (chkStart.line < this._start_pos.line) || (chkStart.line == this._start_pos.line && chkStart.character == this._start_pos.character) ? true : false;
        return (isAfter && isBefore);
    }
    //overrides
    static CanCreateCard() {
        throw new Error('Static Method "CanCreateCard()" must be implemented.');
    }
    isValidCard() {
        throw new Error('Method "isValidCard()" must be implemented.');
    }
    updateCard() {
        throw new Error('Method "isValidCard()" must be implemented.');
    }
}
exports.Card = Card;
Card._universe_ids = [0];
function surf_type_test(surf, num_params) {
    const regex_surf = new RegExp(`[\\s](${surf})[\\s]`);
    const regex_params = new RegExp(`([\\s]\\d+\\.?\\d*){${num_params}}`);
}
//# sourceMappingURL=card.js.map