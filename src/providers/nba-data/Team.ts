import {Player} from "./Player";

export class Team {
  teamId: string;
  tricode: string;  //Abbreviation
  ttsName: string;  //Full Name
  primaryColor: string;
  secondaryColor: string;
  players: Player[];

  constructor() {
    this.teamId = "";
    this.tricode = "";
    this.ttsName = "";
    this.primaryColor = "#FFF";
    this.secondaryColor = "#FFF";
    this.players = new Array<Player>();
  }
}
