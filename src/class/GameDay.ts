import {NbaGame} from "./nbaGame";

export class GameDay {
  date: Date;
  nbaGames: Array<NbaGame>;

  constructor() {
    this.date = new Date();
    this.nbaGames = new Array<NbaGame>();
  }
}
