import Base from './base';

class Store extends Base {
  private name: string;
  private store: any;
  private hardKeys: string[]; // Array of all the overriden keys. Values of hardKeys CAN ONLY be updated by hardSet.

  constructor(name: string = 'env', readFromEnv: boolean = true) {
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

  public set(key: string, value: any): boolean {
    if (this.hardKeys.includes(key)) return false;
    this.store[key] = value;
    return true;
  }

  public hardSet(key: string, value: any): boolean {
    this.store[key] = value;
    if (!this.hardKeys.includes(key)) this.hardKeys.push(key);
    return true;
  }

  public get(key: string): any {
    return this.store[key];
  }

  public fetch(): any {
    return this.store;
  }

  public override(key: string, value: any): boolean {
    if (this.hardKeys.includes(key)) return false;
    this.hardKeys.push(key);
    this.store[key] = value;
    return true;
  }

  public getName(): string {
    return this.name;
  }
}

export default Store;
