import {NbaTeam} from "./nbaTeam";

export class NbaPlayer {
  personId: number;
  firstName: string;
  lastName: string;
  jersey: number;
  ppg: number;
  rpg: number;
  apg: number;
  team: NbaTeam;
  selected: boolean;

  constructor() {
    this.personId = 0;
    this.firstName = '';
    this.lastName = '';
    this.jersey = 0;
    this.ppg = 0;
    this.rpg = 0;
    this.apg = 0;
    this.team = new NbaTeam();
  }
}
