import Store from './store';

class Conf {
  static _conf: Conf;
  static stores: Array<Store> = [new Store('env')];
  private constructor() {}

  public static init(config: any, storeName: string = 'env') {
    const store = Conf.getStore(storeName);
    if (store !== null) {
      store.init(config);
    }
    return this._conf || (this._conf = new Conf());
  }

  public static addStore(name: string, readFromEnv: boolean = true): boolean {
    let isStoreValid = true;
    Conf.stores.forEach((store) => {
      if (store.getName() === name) isStoreValid = false;
    });
    if (!isStoreValid) return false;
    Conf.stores.push(new Store(name, readFromEnv));
    return true;
  }

  public static getStore(name: string = 'env'): Store | null {
    let store: any = null;
    Conf.stores.forEach((s) => {
      if (s.getName() === name) store = s;
    });
    return store;
  }

  public static get(key: string | null = null, storeName: string = 'env'): any {
    if (key === null) {
      const store: any = Conf.getStore(storeName);
      if (store === null) return null;
      return store.fetch();
    } else {
      const store = Conf.getStore(storeName);
      if (store === null) return null;
      return store.get(key);
    }
  }

  public static set(key: string, value: any, storeName: string = 'env'): boolean {
    const store = Conf.getStore(storeName);
    if (!store) return false;
    return store.set(key, value);
  }

  public static override(key: string, value: any, storeName: string = 'env'): boolean {
    const store = Conf.getStore(storeName);
    if (!store) return false;
    return store.override(key, value);
  }

  public static hardSet(key: string, value: any, storeName: string = 'env'): boolean {
    const store = Conf.getStore(storeName);
    if (!store) return false;
    return store.hardSet(key, value);
  }
}

export default Conf;
