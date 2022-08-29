"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPartial = exports.buildTest = exports.buildTestList = void 0;
function buildTestList(list, mods = "") {
    const list_str = `(?:[\\s]|^)(${list.join('|')})(?:[\\s]|$)`;
    return buildTest(list_str, mods);
}
exports.buildTestList = buildTestList;
function buildTest(test, mods = "") {
    if (mods === "") {
        return new RegExp(`(?:(${test}))`);
    }
    else {
        return new RegExp(`(?:(${test}))`, mods);
    }
}
exports.buildTest = buildTest;
function buildPartial(item) {
    const str_array = [];
    for (i of item) {
        str_array.push(`(?:${i}|$)`);
    }
    return buildTestList(str_array);
}
exports.buildPartial = buildPartial;
//# sourceMappingURL=regexpressions.js.map