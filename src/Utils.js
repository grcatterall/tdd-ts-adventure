"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.print = void 0;
const print = (text, dom = null) => {
    console.log(text);
    if (dom) {
        dom.innerHTML += text;
    }
};
exports.print = print;
const clear = (dom = null) => {
    console.clear();
    if (dom) {
        dom.innerHTML = '';
    }
};
exports.clear = clear;
//# sourceMappingURL=Utils.js.map