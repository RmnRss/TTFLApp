import {Team} from "./Team";

export class Game {

  constructor() {
    this._startDateEastern = '';
    this._vTeam = new Team();
    this._hTeam = new Team();
  }

  private _startDateEastern: string;

  get startDateEastern(): string {
    return this._startDateEastern;
  }

  set startDateEastern(value: string) {
    this._startDateEastern = value;
  }

  private _hTeam: Team; //Home Team id

  get hTeam(): Team {
    return this._hTeam;
  }

  set hTeam(value: Team) {
    this._hTeam = value;
  }

  private _vTeam: Team; //Visitor Team id

  get vTeam(): Team {
    return this._vTeam;
  }

  set vTeam(value: Team) {
    this._vTeam = value;
  }

}
