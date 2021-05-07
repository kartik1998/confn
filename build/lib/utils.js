"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raiseError = void 0;
const raiseError = (message, code = 1) => {
    const err = new Error(message);
    err.code = code;
    throw err;
};
exports.raiseError = raiseError;
