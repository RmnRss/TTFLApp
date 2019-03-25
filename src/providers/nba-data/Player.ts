export class Player {
  personId: string;
  firstName: string;
  lastName: string;
  jersey: number;
  ppg: number;
  rpg: number;
  apg: number;

  constructor() {
    this.personId = '';
    this.firstName = '';
    this.lastName = '';
    this.jersey = 0;
    this.ppg = 0;
    this.rpg = 0;
    this.apg = 0;
  }
}
