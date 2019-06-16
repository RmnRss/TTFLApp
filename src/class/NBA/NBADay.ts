import {NBAGame} from "./NBAGame";

export class NBADay {

  private _startTime: Date;

  constructor() {
    this._date = new Date();
    this._nbaGames = new Array<NBAGame>();
  }

  private _date: Date;

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  private _nbaGames: Array<NBAGame>;

  get nbaGames(): Array<NBAGame> {
    return this._nbaGames;
  }

  set nbaGames(value: Array<NBAGame>) {
    this._nbaGames = value;
  }

  /***
   * Returns if an NBADay has games
   */
  hasGames(): boolean {
    return this._nbaGames.length > 0;
  }

  /***
   * Returns if the day has started
   */
  hasStarted(): boolean {
    //TODO: Test
    let today = new Date();
    return today >= this.getStartTime();
  }

  /***
   * Returns a Date containing the time at which the first game of the day starts
   */
  getStartTime(): Date {
    // If there is at least one game that day, we get the earliest one
    if (this.hasGames()) {
      if (this._nbaGames.length == 1) {
        return new Date(this._nbaGames[0].startTimeUTC);
      } else {
        let index = 0;
        let earliest: Date;
        earliest = this._nbaGames[index].startTimeUTC;

        while (index <= this._nbaGames.length - 2) {
          if (earliest > this._nbaGames[index + 1].startTimeUTC) {
            earliest = this._nbaGames[index + 1].startTimeUTC;
            index++;
          } else {
            index++;
          }
        }

        return new Date(earliest);
      }
    } else {
      return this._startTime;
    }
  }
}
