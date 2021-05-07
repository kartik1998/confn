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
      this.set(key, process.env[key]);
    });
  }

  public set(key: string, value: any): void {
    if (this.hardKeys.includes(key)) utils.raiseError(`Value of a overriden key ${key} cannot be updated`);
    this.store[key] = value;
  }
  public get(key: string): any {
    return this.store[key];
  }
  public override(key: string, value: any): void {
    if (this.hardKeys.includes(key)) utils.raiseError(`Value of a overriden key ${key} cannot be overriden`);
    this.hardKeys.push(key);
    this.store[key] = value;
  }
}

export default Env;
