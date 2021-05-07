import Base from './base';
import * as utils from '../lib/utils';

class Env extends Base {
  private name: string;
  private store: any;
  private hardKeys: string[]; // Array of all the overriden keys. Values of hardKeys CANNOT be updated.

  constructor() {
    super();
    this.store = {};
    this.hardKeys = [];
    this.name = 'env';
    Object.keys(process.env).forEach((key) => {
      this.override(key, process.env[key]);
    });
  }

  public set(key: string, value: any): boolean {
    if (this.hardKeys.includes(key)) return false;
    this.store[key] = value;
    return true;
  }
  public get(key: string): any {
    return this.store[key];
  }
  public override(key: string, value: any): boolean {
    if (this.hardKeys.includes(key)) return false;
    this.hardKeys.push(key);
    this.store[key] = value;
    return true;
  }
}

export default Env;
