"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
class Conf {
    constructor() { }
    static init() {
        return this._conf || (this._conf = new Conf());
    }
    static addStore(name, readFromEnv = true) {
        let isStoreValid = true;
        Conf.stores.forEach(store => {
            if (store.getName() === name)
                isStoreValid = false;
        });
        if (!isStoreValid)
            return false;
        Conf.stores.push(new store_1.default(name, readFromEnv));
        return true;
    }
    static getStore(name = 'env') {
        let store = null;
        Conf.stores.forEach(s => {
            if (s.getName() === name)
                store = s;
        });
        return store;
    }
    static get() {
        const env = Conf.getStore();
        return env.fetch();
    }
}
Conf.stores = [new store_1.default('env')];
exports.default = Conf;
