export class User {
  id: number;
  teamId: number;
  email: string;
  username: string;
  points: number;
  money: number;
  rank: number;
  hasTeam: boolean;

  constructor() {
    this.id = null;
    this.teamId = null;
    this.username = "";
    this.email = "";
    this.points = 0;
    this.money = 0;
    this.rank = null;
    this.hasTeam = false;
  }
}
