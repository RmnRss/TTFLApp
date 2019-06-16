import {NBAPlayer} from "../NBA/NBAPlayer";
import {NBADay} from "../NBA/NBADay";

export class TTFLPick
{
  nbaPlayer: NBAPlayer;
  gameDate: NBADay;
  bestPick: boolean;
  worstPick: boolean;
  score: number;
  hasPlayer: boolean;
  isUpdated: boolean;
  opponent: string;

  constructor() {
    this.nbaPlayer = new NBAPlayer();
    this.gameDate = new NBADay();
    this.bestPick = false;
    this.worstPick = false;
    this.score = 0;
    this.hasPlayer = false;
    this.isUpdated = false;
    this.opponent = "Opposing Team";
  }
}
