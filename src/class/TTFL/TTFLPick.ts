import {NBAPlayer} from "../NBA/NBAPlayer";
import {NBADay} from "../NBA/NBADay";

export class TTFLPick {
  nbaPlayer: NBAPlayer;
  gameDate: NBADay;
  bestPick: boolean;
  worstPick: boolean;
  score: number;
  hasPlayer: boolean;
  isUpdated: boolean;
  opponent: string;
  rank:number;
  id:number;

  constructor() {
    this.nbaPlayer = new NBAPlayer();
    this.gameDate = new NBADay();
    this.bestPick = false;
    this.worstPick = false;
    this.score = 0;
    this.rank = null;
    this.hasPlayer = false;
    this.isUpdated = false;
    this.opponent = "Opposing Team";
  }
}
