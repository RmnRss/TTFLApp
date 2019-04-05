import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Links} from "./Links";
import {NbaTeam} from "../../class/nbaTeam";
import {NbaPlayer} from "../../class/nbaPlayer";

@Injectable()
export class NbaDataProvider {
  baseUrl: string = 'http://data.nba.net/10s';
  links: Links = new Links();

  constructor(public http: HttpClient) {
    console.log('Starting NbaData Provider');
  }

  getLinksPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Promise to " + this.baseUrl + "/prod/v1/today.json")

      this.http.get(this.baseUrl + "/prod/v1/today.json")
        .subscribe(success => resolve(success));
    });
  }

  getSchedulePromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Promise to " + this.baseUrl + this.links.leagueSchedule);

      this.http.get(this.baseUrl + this.links.leagueSchedule)
        .subscribe(success => resolve(success));
    })
  }

  getTeamInfoPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Promise to " + this.baseUrl + this.links.teamsConfig);

      this.http.get(this.baseUrl + this.links.teamsConfig)
        .subscribe(success => resolve(success));
    })

  }

  getRosterPromise(team: NbaTeam): Promise<any> {
    return new Promise((resolve, reject) => {
      let rosterUrl = this.links.teamRoster.replace("{{teamUrlCode}}", team.teamId);
      console.log("Promise to " + this.baseUrl + rosterUrl);

      this.http.get(this.baseUrl + rosterUrl)
        .subscribe(success => resolve(success));
    })

  }

  getPlayerPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Promise to " + this.baseUrl + this.links.leagueRosterPlayers);
      this.http.get(this.baseUrl + this.links.leagueRosterPlayers)
        .subscribe(success => resolve(success));
    })

  }

  getPlayerSeasonStatsPromise(player: NbaPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let profileUrl = this.links.playerProfile.replace("{{personId}}", player.personId);
      console.log("Promise to " + this.baseUrl + profileUrl);
      this.http.get(this.baseUrl + profileUrl)
        .subscribe(success => resolve(success));
    })

  }

  getPlayerLastGameStatsPromise(player: NbaPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let gamelogUrl = this.links.playerGameLog.replace("{{personId}}", player.personId);
      console.log("Promise to " + this.baseUrl + gamelogUrl);
      this.http.get(this.baseUrl + gamelogUrl)
        .subscribe(success => resolve(success));
    })
  }

}
