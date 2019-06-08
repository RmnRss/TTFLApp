import {NbaPlayer} from "./nbaPlayer";
import {DateServiceProvider} from "../providers/date-service/date-service";
import {GameDay} from "./GameDay";

export class TtflPick {
  nbaPlayer: NbaPlayer;
  gameDate: GameDay;
  closingTime: Date;
  bestPick: boolean;
  worstPick: boolean;
  score: number;
  hasPlayer: boolean;
  gamePlayed: boolean;


  constructor(public dateService: DateServiceProvider) {
    this.nbaPlayer = new NbaPlayer();
    this.gameDate = new GameDay();
    this.closingTime = new Date();
    this.bestPick = false;
    this.worstPick = false;
    this.score = 0;
    this.hasPlayer = false;
    this.gamePlayed = false;
  }

  GamePlayed(): boolean {
    if (this.dateService.today.getHours() > 11 && this.dateService.today > this.gameDate.date) {
      this.gamePlayed = true;
    } else {
      this.gamePlayed = false;
    }
    return this.gamePlayed
  }
}
