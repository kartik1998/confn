"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./confm/env"));
const env = new env_1.default();
env.set('live', { set: 'two', ref: 'one' });
env.override('work', { sde: '1' });
console.log(env);
