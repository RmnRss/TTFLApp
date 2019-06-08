import {NBAGame} from "./NBA/NBAGame";

export class GameDay {
  date: Date;
  nbaGames: Array<NBAGame>;

  constructor() {
    this.date = new Date();
    this.nbaGames = new Array<NBAGame>();
  }
}
