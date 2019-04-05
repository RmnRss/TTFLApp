import {NbaTeam} from "./nbaTeam";

export class NbaGame {

  constructor() {
    this._startDateEastern = '';
    this._vTeam = new NbaTeam();
    this._hTeam = new NbaTeam();
  }

  private _startDateEastern: string;

  get startDateEastern(): string {
    return this._startDateEastern;
  }

  set startDateEastern(value: string) {
    this._startDateEastern = value;
  }

  private _hTeam: NbaTeam; //Home NbaTeam id

  get hTeam(): NbaTeam {
    return this._hTeam;
  }

  set hTeam(value: NbaTeam) {
    this._hTeam = value;
  }

  private _vTeam: NbaTeam; //Visitor NbaTeam id

  get vTeam(): NbaTeam {
    return this._vTeam;
  }

  set vTeam(value: NbaTeam) {
    this._vTeam = value;
  }

}
