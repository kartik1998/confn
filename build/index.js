"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mode_1 = __importDefault(require("./confm/mode"));
const mode = new mode_1.default();
mode.removeMode('defaults');
console.log(mode);
