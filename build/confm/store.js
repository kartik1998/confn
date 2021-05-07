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
    fetch() {
        return this.store;
    }
    override(key, value) {
        if (this.hardKeys.includes(key))
            return false;
        this.hardKeys.push(key);
        this.store[key] = value;
        return true;
    }
    getName() {
        return this.name;
    }
    init(config, modes) {
        if (!config)
            return;
        const NODE_ENV = this.store['NODE_ENV'];
        // setup defaults
        Object.keys(config['defaults']).forEach(key => {
            this.override(key, config['defaults'][key]);
        });
        Object.keys(config).forEach(key => {
            if (key !== 'defaults' && (typeof NODE_ENV === 'string' && NODE_ENV === key)) {
                Object.keys(config[key]).forEach(k => {
                    this.hardSet(k, config[key][k]);
                });
            }
        });
    }
}
exports.default = Store;
