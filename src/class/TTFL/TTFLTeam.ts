import {User} from "./user";

export class TTFLTeam {
  id: number;
  name: string;
  members: Array<User>;
  points: number;
  rank: number;

  constructor() {
    this.id = null;
    this.name = "";
    this.members = new Array<User>();
    this.points = 0;
    this.rank = null;
  }
}
