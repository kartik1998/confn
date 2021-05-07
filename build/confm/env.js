"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const utils = __importStar(require("../lib/utils"));
class Env extends base_1.default {
    constructor() {
        super();
        this.store = {};
        this.hardKeys = [];
        this.name = 'env';
        Object.keys(process.env).forEach((key) => {
            this.set(key, process.env[key]);
        });
    }
    set(key, value) {
        if (this.hardKeys.includes(key))
            utils.raiseError(`Value of a overriden key ${key} cannot be updated`);
        this.store[key] = value;
    }
    get(key) {
        return this.store[key];
    }
    override(key, value) {
        if (this.hardKeys.includes(key))
            utils.raiseError(`Value of a overriden key ${key} cannot be overriden`);
        this.hardKeys.push(key);
        this.store[key] = value;
    }
}
exports.default = Env;
