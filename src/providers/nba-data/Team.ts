import {Player} from "./Player";

export class Team {

  constructor() {
    this._teamId = "";
    this._tricode = "";
    this._ttsName = "";
    this._primaryColor = "#FFF";
    this._secondaryColor = "#FFF";
    this._players = new Array<Player>();
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

  private _players: Player[];

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
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
