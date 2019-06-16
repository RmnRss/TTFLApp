export class NBATeamColors {

  constructor(primaryColor: string, secondaryColor: string) {
    this._primary = primaryColor;
    this._secondary = secondaryColor;
  }

  private _primary: string;

  get primary() {
    return this._primary;
  }

  set primary(value: string) {
    this._primary = value;
  }

  private _secondary: string;

  get secondary(): string {
    return this._secondary;
  }

  set secondary(value: string) {
    this._secondary = value;
  }
}
