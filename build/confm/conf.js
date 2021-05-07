"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const mode_1 = __importDefault(require("./mode"));
class Conf {
    constructor() { }
    static init(config, storeName = 'env') {
        const store = Conf.getStore(storeName);
        if (store !== null) {
            store.init(config, Conf.mode.getModes());
        }
        return this._conf || (this._conf = new Conf());
    }
    static addStore(name, readFromEnv = true) {
        let isStoreValid = true;
        Conf.stores.forEach((store) => {
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
        Conf.stores.forEach((s) => {
            if (s.getName() === name)
                store = s;
        });
        return store;
    }
    static get(key = null, storeName = 'env') {
        if (key === null) {
            const env = Conf.getStore();
            return env.fetch();
        }
        else {
            const store = Conf.getStore(storeName);
            if (store === null)
                return null;
            return store.get(key);
        }
    }
    static addMode(mode) {
        return Conf.mode.addMode(mode);
    }
    static removeMode(mode) {
        return Conf.mode.removeMode(mode);
    }
}
Conf.stores = [new store_1.default('env')];
Conf.mode = new mode_1.default();
exports.default = Conf;
