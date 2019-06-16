import {NBATeamColors} from "./NBATeamColors";

export class NBATeam {

  constructor() {
    this._teamId = "";
    this._tricode = "";
    this._ttsName = "";
    this._colors = new NBATeamColors('#000', '#FFF');
    this._loss = "0";
    this._wins = "0";
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

  private _colors: NBATeamColors;

  get colors(): NBATeamColors {
    return this._colors;
  }

  set colors(value: NBATeamColors) {
    this._colors = value;
  }

  private _tName: string; //Surname

  get tName(): string {
    return this._tName;
  }

  private _logoUrl: string;

  get logoUrl(): string {
    return this._logoUrl;
  }

  private _wins: string;

  get wins(): string {
    return this._wins;
  }

  set wins(value: string) {
    this._wins = value;
  }

  private _loss: string;

  get loss(): string {
    return this._loss;
  }

  set loss(value: string) {
    this._loss = value;
  }
}
