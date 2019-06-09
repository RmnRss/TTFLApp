import {NBAPlayer} from "../NBA/NBAPlayer";
import {GameDay} from "../GameDay";

export class TTFLPick {
  nbaPlayer: NBAPlayer;
  gameDate: GameDay;
  closingTime: Date;
  bestPick: boolean;
  worstPick: boolean;
  score: number;
  hasPlayer: boolean;
  gamePlayed: boolean;


  constructor() {
    this.nbaPlayer = new NBAPlayer();
    this.gameDate = new GameDay();
    this.closingTime = new Date();
    this.bestPick = false;
    this.worstPick = false;
    this.score = 0;
    this.hasPlayer = false;
    this.gamePlayed = false;
  }

  /***
   * Checks if the game concerning the pick has been played
   * @constructor
   */
  GamePlayed(): boolean {
    //TODO: Fix
    let today = new Date();

    if (today.getHours() > 11 && today > this.gameDate.date) {
      this.gamePlayed = true;
    } else {
      this.gamePlayed = false;
    }
    return this.gamePlayed
  }
}
