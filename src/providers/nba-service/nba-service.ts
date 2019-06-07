import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Links} from "../../class/Links";
import {NbaTeam} from "../../class/nbaTeam";
import {NbaPlayer} from "../../class/nbaPlayer";
import {NbaGame} from "../../class/nbaGame";

@Injectable()
export class NbaDataProvider {
  nbaApiUrl: string = 'http://data.nba.net/10s';

  links: Links = new Links();
  games: NbaGame[] = new Array<NbaGame>();

  /***
   * Initializes the service by getting all the links
   * @param http
   */
  constructor(public http: HttpClient) {
    console.log("NBA SERVICE READY");
  }

  getLinksPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("Promise to " + this.nbaApiUrl + "/prod/v1/today.json");

      this.http.get(this.nbaApiUrl + "/prod/v1/today.json")
        .subscribe(success => resolve(success), error => reject(error));
    });
  }

  getSchedulePromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("Promise to " + this.nbaApiUrl + this.links.leagueSchedule);

      this.http.get(this.nbaApiUrl + this.links.leagueSchedule)
        .subscribe(success => resolve(success), error => reject(error));
    })
  }

  getTeamInfoPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("Promise to " + this.nbaApiUrl + this.links.teamsConfig);

      this.http.get(this.nbaApiUrl + this.links.teamsConfig)
        .subscribe(success => resolve(success), error => reject(error));
    })

  }

  getRosterPromise(team: NbaTeam): Promise<any> {
    return new Promise((resolve, reject) => {
      let rosterUrl = this.links.teamRoster.replace("{{teamUrlCode}}", team.teamId);
      //console.log("Promise to " + this.nbaApiUrl + rosterUrl);

      this.http.get(this.nbaApiUrl + rosterUrl)
        .subscribe(success => resolve(success), error => reject(error));
    })

  }

  getPlayerPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("Promise to " + this.nbaApiUrl + this.links.leagueRosterPlayers);

      this.http.get(this.nbaApiUrl + this.links.leagueRosterPlayers)
        .subscribe(success => resolve(success), error => reject(error));
    })
  }

  getPlayerSeasonStatsPromise(player: NbaPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let profileUrl = this.links.playerProfile.replace("{{personId}}", player.personId.toString());
      //console.log("Promise to " + this.nbaApiUrl + profileUrl);

      this.http.get(this.nbaApiUrl + profileUrl)
        .subscribe(success => resolve(success), error => reject(error));
    })

  }

  getPlayerLastGameStatsPromise(player: NbaPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let gamelogUrl = this.links.playerGameLog.replace("{{personId}}", player.personId.toString());
      //console.log("Promise to " + this.nbaApiUrl + gamelogUrl);

      this.http.get(this.nbaApiUrl + gamelogUrl)
        .subscribe(success => resolve(success), error => reject(error));
    })
  }

}
