/**
 * @Base abstract base class for confm stores
 */
abstract class Base {
  public abstract set(key: string, value: any): boolean;
  public abstract get(key: string): any;
  public abstract fetch(): any;
  public abstract override(key: string, value: any): boolean;
  public abstract hardSet(key: string, value: any): boolean;
  public abstract getName(): string;
}

export default Base;
