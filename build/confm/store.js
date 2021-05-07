"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class Store extends base_1.default {
    constructor(name = 'env', readFromEnv = true) {
        super();
        this.store = {};
        this.hardKeys = [];
        this.name = name;
        if (readFromEnv) {
            Object.keys(process.env).forEach((key) => {
                this.override(key, process.env[key]);
            });
        }
    }
    set(key, value) {
        if (this.hardKeys.includes(key))
            return false;
        this.store[key] = value;
        return true;
    }
    hardSet(key, value) {
        this.store[key] = value;
        if (!this.hardKeys.includes(key))
            this.hardKeys.push(key);
        return true;
    }
    get(key) {
        return this.store[key];
    }
    override(key, value) {
        if (this.hardKeys.includes(key))
            return false;
        this.hardKeys.push(key);
        this.store[key] = value;
        return true;
    }
}
exports.default = Store;
