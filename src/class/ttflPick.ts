import {NbaPlayer} from "./nbaPlayer";

export class TtflPick {
  nbaPlayer: NbaPlayer;
  date: Date;
  bestPick: boolean;
  worstPick: boolean;
  score: number;

  constructor() {
    this.nbaPlayer = new NbaPlayer();
    this.date = new Date();
    this.bestPick = false;
    this.worstPick = false;
    this.score = 0;
  }
}
