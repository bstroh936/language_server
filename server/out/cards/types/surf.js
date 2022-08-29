"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Surf = void 0;
const card_1 = require("../card");
function createSurfaceType(config) {
    let newSurfaceType = { sym: config.sym, desc: config.desc, param: "" };
    if (config.param) {
        newSurfaceType.param = config.param;
    }
    return newSurfaceType;
}
const allSurfTypes = [
    { t: 'inf', d: 'all space', p: '' },
    { t: 'px', d: 'plane perpendicular to x-axis', p: 'x0' },
    { t: 'py', d: 'plane perpendicular to y-axis', p: 'y0' },
    { t: 'pz', d: 'plane perpendicular to z-axis', p: 'z0' },
    { t: 'sph', d: 'sphere', p: 'x0, y0, z0, r' },
    { t: 'cylx', d: 'circular cylinder parallel to x-axis', p: 'y0, z0, r, x1, x2' },
    { t: 'cyly', d: 'circular cylinder parallel to y-axis', p: 'x0, z0, r, y1, y2' },
    { t: 'cylz', d: 'circular cylinder parallel to z-axis', p: 'x0, y0, r, z1, z2' },
    { t: 'cyl', d: 'circular cylinder parallel to z-axis', p: 'x0, y0, r, z1, z2' },
    { t: 'sqc', d: 'square cylinder parallel to z-axis', p: 'x0, y0, r, r0' },
    { t: 'cube', d: 'cube', p: 'x0, y0, z0, r' },
    { t: 'cuboid', d: 'cuboid', p: 'x1, x2, y1, y2, z1, z2' },
    { t: 'hexxc', d: 'x-type hexagonal cylinder parallel to z-axis', p: 'x0, y0, r, r0' },
    { t: 'hexyc', d: 'y-type hexagonal cylinder parallel to z-axis', p: 'x0, y0, r, r0' },
    { t: 'hexxprism', d: 'x-type hexagonal prism parallel to z-axis', p: 'x0, y0, r, z1, z2' },
    { t: 'hexyprism', d: 'y-type hexagonal prism parallel to z-axis', p: 'x0, y0, r, z1, z2' },
    { t: 'cross', d: 'cruciform cylinder parallel to z-axis', p: 'x0, y0, r, d, r0' },
    { t: 'pad', d: '(see description below)', p: 'x0, y0, r1, r2, theta1, theta2' },
    { t: 'conx', d: 'cone oriented in the x-axis', p: 'x0, y0, z0, r, h' },
    { t: 'cony', d: 'cone oriented in the y-axis', p: 'x0, y0, z0, r, h' },
    { t: 'conz', d: 'cone oriented in the z-axis', p: 'x0, y0, z0, r, h' },
    { t: 'cone', d: 'cone oriented in the z-axis', p: 'x0, y0, z0, r, h' },
    { t: 'dode', d: 'dodecagonal cylinder parallel to z-axis', p: 'x0, y0, r1, r2' },
    { t: 'octa', d: 'octagonal cylinder parallel to z-axis', p: 'x0, y0, r1, r2' },
    { t: 'plane', d: 'general plane', p: 'A,B,C,D' },
    { t: 'quadratic', d: 'general quadratic surface', p: 'A,B,C,D,E,F,G,H,J,K' }
];
const c = allSurfTypes.forEach(e => {
    return createSurfaceType({ sym: e.t, desc: e.d, param: e.p });
});
const def = "/*The syntax of the surface card is:\nsurf <id> <type> <param 1> <param 2> ...\nwhere <id> is the surface identifier\n<type> is the surface type (see Table 3.1)\n<param 1> <param 2> ... are the surface parameters";
const des = "surface definition";
const c_type = "";
class Surf extends card_1.Card {
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
    static isExisting(cell_id) {
        return this._id_list.includes(cell_id);
    }
}
exports.Surf = Surf;
Surf._id_list = [];
//# sourceMappingURL=surf.js.map