/**
 * @Base abstract base class for confm stores
 */
abstract class Base {
  public abstract set(key: string, value: any): void;
  public abstract get(key: string): any;
  public abstract override(key: string, value: any): void;
}

export default Base;