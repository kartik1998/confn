import Store from './store';

class Conf {
  static _conf: Conf;
  static stores: Array<Store> = [new Store('env')];
  private constructor() {}

  public static init() {
    return this._conf || (this._conf = new Conf());
  }

  public static addStore(name: string, readFromEnv: boolean = true): boolean {
    let isStoreValid = true;
    Conf.stores.forEach(store => {
        if(store.getName() === name) isStoreValid = false;
    });
    if(!isStoreValid) return false;
    Conf.stores.push(new Store(name, readFromEnv));
    return true;
  }

  public static getStore(name: string = 'env'): Store | null {
      let store: any = null;
      Conf.stores.forEach(s => {
          if(s.getName() === name) store = s;
      })
      return store;
  }

  public static get(): any {
    const env: any = Conf.getStore();
    return env.fetch();
  }
}

export default Conf;
