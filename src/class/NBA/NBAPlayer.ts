import {NBATeam} from "./NBATeam";

export class NBAPlayer {
  personId: number;
  firstName: string;
  lastName: string;
  jersey: number;
  ppg: number;
  rpg: number;
  apg: number;
  team: NBATeam;
  selected: boolean;
  isInjured: boolean;
  isAvailable: boolean;
  pos: string;

  constructor() {
    this.personId = 0;
    this.firstName = '';
    this.lastName = '';
    this.jersey = 0;
    this.ppg = 0;
    this.rpg = 0;
    this.apg = 0;
    this.team = new NBATeam();
    this.selected = false;
    this.isInjured = false;
    this.isAvailable = true;
    this.pos = "N";
  }
}
