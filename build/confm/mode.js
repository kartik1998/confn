"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mode {
    constructor() {
        this.modes = ['defaults', 'development', 'staging', 'production'];
    }
    addMode(mode) {
        if (this.modes.includes(mode))
            return false;
        this.modes.push(mode);
        return true;
    }
    removeMode(mode) {
        let modeFound = false;
        const tempModes = [];
        this.modes.forEach(m => {
            if (m === mode) {
                modeFound = true;
            }
            else {
                tempModes.push(m);
            }
        });
        this.modes = tempModes;
        return modeFound;
    }
}
exports.default = Mode;
