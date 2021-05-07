import Store from './store';
import Mode from './mode';

class Conf {
  static _conf: Conf;
  static stores: Array<Store> = [new Store('env')];
  static mode: Mode = new Mode();
  private constructor() {}

  public static init(config: JSON | undefined, storeName: string = 'env') {
    const store = Conf.getStore(storeName);
    if (store !== null) {
      store.init(config, Conf.mode.getModes());
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
      const env: any = Conf.getStore();
      return env.fetch();
    } else {
      const store = Conf.getStore(storeName);
      if (store === null) return null;
      return store.get(key);
    }
  }

  public static addMode(mode: string): boolean {
    return Conf.mode.addMode(mode);
  }

  public static removeMode(mode: string): boolean {
    return Conf.mode.removeMode(mode);
  }
}

export default Conf;
