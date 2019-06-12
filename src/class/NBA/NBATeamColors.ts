export class NBATeamColors {

  private _primary: string;
  private _secondary: string;

  constructor(primaryColor: string, secondaryColor: string) {
    this._primary = primaryColor;
    this._secondary = secondaryColor;
  }

  set primary(value: string) {
    this._primary = value;
  }

  get primary() {
    return this._primary;
  }

  set secondary(value: string) {
    this._secondary = value;
  }

  get secondary(): string {
    return this._secondary;
  }
}
