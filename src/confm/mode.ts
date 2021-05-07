export default class Mode {
  private modes: Array<string>;
  constructor() {
    this.modes = ['defaults', 'development', 'staging', 'production'];
  }

  public addMode(mode: string): boolean {
    if (this.modes.includes(mode)) return false;
    this.modes.push(mode);
    return true;
  }

  public getModes(): Array<string> {
    return this.modes;
  }

  public removeMode(mode: string): boolean {
    let modeFound = false;
    const tempModes: Array<string> = [];
    this.modes.forEach((m) => {
      if (m === mode) {
        modeFound = true;
      } else {
        tempModes.push(m);
      }
    });
    this.modes = tempModes;
    return modeFound;
  }
}
