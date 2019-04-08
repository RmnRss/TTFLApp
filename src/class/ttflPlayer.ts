export class TtflPlayer {
  email: string;
  login: string;
  password: string;
  points: number;
  money: number;

  constructor(email: string, password: string, login: string) {
    this.email = email;
    this.login = login;
    this.password = password;
    this.points = 0;
    this.money = 0;
  }
}
