import {NBATeam} from "./NBATeam";

export class NBAGame {

  private _startTimeUTC: Date; //Time at which the game starts
  private _startDateEastern: string;
  private _hTeam: NBATeam; //Home NBATeam id
  private _vTeam: NBATeam; //Visitor NBATeam id

  constructor() {
    this._startTimeUTC = new Date();
    this._startDateEastern = '';
    this._vTeam = new NBATeam();
    this._hTeam = new NBATeam();
  }

  get startTimeUTC(): Date {
    return this._startTimeUTC;
  }

  set startTimeUTC(value: Date) {
    this._startTimeUTC = value;
  }

  get startDateEastern(): string {
    return this._startDateEastern;
  }

  set startDateEastern(value: string) {
    this._startDateEastern = value;
  }

  get hTeam(): NBATeam {
    return this._hTeam;
  }

  set hTeam(value: NBATeam) {
    this._hTeam = value;
  }

  get vTeam(): NBATeam {
    return this._vTeam;
  }

  set vTeam(value: NBATeam) {
    this._vTeam = value;
  }

}
