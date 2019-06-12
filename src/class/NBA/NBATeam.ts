import {NBATeamColors} from "./NBATeamColors";

export class NBATeam {

  private _teamId: string;
  private _tricode: string;  //Abbreviation
  private _ttsName: string;  //Full Name
  private _colors: NBATeamColors;
  private _tName: string; //Surname
  private _logoUrl: string;
  private _wins: string;
  private _loss: string;

  constructor() {
    this._teamId = "";
    this._tricode = "";
    this._ttsName = "";
    this._colors = new NBATeamColors('#000', '#FFF');
    this._loss = "0";
    this._wins = "0";
  }

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

  get teamId(): string {
    return this._teamId;
  }

  set teamId(value: string) {
    this._teamId = value;
  }


  get tricode(): string {
    return this._tricode;
  }

  set tricode(value: string) {
    this._logoUrl = "https://www.nba.com/assets/logos/teams/primary/web/" + value + ".svg"
    this._tricode = value;
  }

  get ttsName(): string {
    return this._ttsName;
  }

  set ttsName(value: string) {
    let n = value.split(" ");
    this._tName = n[n.length - 1];
    this._ttsName = value;
  }

  get colors(): NBATeamColors {
    return this._colors;
  }

  set colors(value: NBATeamColors) {
    this._colors = value;
  }

  get logoUrl(): string {
    return this._logoUrl;
  }

  get tName(): string {
    return this._tName;
  }
}
