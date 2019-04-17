export class User {
  id: number;
  email: string;
  username: string;
  points: number;
  money: number;

  constructor() {
    this.id = null;
    this.username = "";
    this.points = 0;
    this.money = 0;
  }
}
