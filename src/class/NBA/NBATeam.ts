export class NBATeam {

  constructor() {
    this._teamId = "";
    this._tricode = "";
    this._ttsName = "";
    this._primaryColor = "#FFF";
    this._secondaryColor = "#FFF";
    this._loss = "0";
    this._wins = "0";
  }

  private _wins: string;
  private _loss: string;

  get wins(): string {
    return this._wins;
  }

  set wins(value: string) {
    this._wins = value;
  }

  get loss(): string {
    return this._loss;
  }

  set loss(value: string) {
    this._loss = value;
  }

  private _teamId: string;

  get teamId(): string {
    return this._teamId;
  }

  set teamId(value: string) {
    this._teamId = value;
  }

  private _tricode: string;  //Abbreviation

  get tricode(): string {
    return this._tricode;
  }

  set tricode(value: string) {
    this._logoUrl = "https://www.nba.com/assets/logos/teams/primary/web/" + value + ".svg"
    this._tricode = value;
  }

  private _ttsName: string;  //Full Name

  get ttsName(): string {
    return this._ttsName;
  }

  set ttsName(value: string) {
    let n = value.split(" ");
    this._tName = n[n.length - 1];
    this._ttsName = value;
  }

  private _primaryColor: string;

  get primaryColor(): string {
    return this._primaryColor;
  }

  set primaryColor(value: string) {
    this._primaryColor = value;
  }

  private _secondaryColor: string;

  get secondaryColor(): string {
    return this._secondaryColor;
  }

  set secondaryColor(value: string) {
    this._secondaryColor = value;
  }

  private _logoUrl: string;

  get logoUrl(): string {
    return this._logoUrl;
  }

  private _tName: string; //Surname

  get tName(): string {
    return this._tName;
  }
}
