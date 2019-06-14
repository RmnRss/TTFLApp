import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NBALinks} from "../../class/NBA/NBALinks";
import {NBATeam} from "../../class/NBA/NBATeam";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";
import {NBAGame} from "../../class/NBA/NBAGame";
import {NBATeamColors} from "../../class/NBA/NBATeamColors";

@Injectable()
export class NbaDataProvider {
  nbaApiUrl: string = 'http://data.nba.net/10s';

  links: NBALinks = new NBALinks();
  NBATeamsColors: Map<string, NBATeamColors>;

  /***
   * Initializes the service by getting all the links
   * @param http
   */
  constructor(public http: HttpClient) {
    console.log("NBA SERVICE READY");
    this.NBATeamsColors = new Map<string, NBATeamColors>();

    this.NBATeamsColors.set('ATL', new NBATeamColors('#e03a3e', '#26282a'));
    this.NBATeamsColors.set('BOS', new NBATeamColors('#008348', '#000000'));
    this.NBATeamsColors.set('BKN', new NBATeamColors('#000000', '#FFFFFF'));
    this.NBATeamsColors.set('CHA', new NBATeamColors('#00788c', '#1d1160'));
    this.NBATeamsColors.set('CHI', new NBATeamColors('#ce1141', '#000000'));
    this.NBATeamsColors.set('CLE', new NBATeamColors('#6f263d', '#ffb81c'));
    this.NBATeamsColors.set('DAL', new NBATeamColors('#00285e', '#0053bc'));
    this.NBATeamsColors.set('DEN', new NBATeamColors('#0e2240', '#fec524'));
    this.NBATeamsColors.set('DET', new NBATeamColors('#1d428a', '#c8102e'));
    this.NBATeamsColors.set('GSW', new NBATeamColors('#006bb6', '#fdb927'));
    this.NBATeamsColors.set('HOU', new NBATeamColors('#ce1141', '#c4ced4'));
    this.NBATeamsColors.set('IND', new NBATeamColors('#002d62', '#fdbb30'));
    this.NBATeamsColors.set('LAC', new NBATeamColors('#c8102e', '#1d428a'));
    this.NBATeamsColors.set('LAL', new NBATeamColors('#fdb927', '#552583'));
    this.NBATeamsColors.set('MEM', new NBATeamColors('#5d76a9', '#12173f'));
    this.NBATeamsColors.set('MIA', new NBATeamColors('#000000', '#98002e'));
    this.NBATeamsColors.set('MIL', new NBATeamColors('#00471b', '#eee1c6'));
    this.NBATeamsColors.set('MIN', new NBATeamColors('#0c2340', '#9ea2a2'));
    this.NBATeamsColors.set('NOP', new NBATeamColors('#002b5c', '#b4975a'));
    this.NBATeamsColors.set('NYK', new NBATeamColors('#006bb6', '#f58426'));
    this.NBATeamsColors.set('OKC', new NBATeamColors('#007ac1', '#ef3b24'));
    this.NBATeamsColors.set('ORL', new NBATeamColors('#0077c0', '#000000'));
    this.NBATeamsColors.set('PHI', new NBATeamColors('#006bb6', '#ed174c'));
    this.NBATeamsColors.set('PHX', new NBATeamColors('#1d1160', '#e56020'));
    this.NBATeamsColors.set('POR', new NBATeamColors('#000000', '#e03a3e'));
    this.NBATeamsColors.set('SAC', new NBATeamColors('#5a2b81', '#63727a'));
    this.NBATeamsColors.set('SAS', new NBATeamColors('#000000', '#c4ced4'));
    this.NBATeamsColors.set('TOR', new NBATeamColors('#ce1141', '#000000'));
    this.NBATeamsColors.set('UTA', new NBATeamColors('#00471b', '#f9a01b'));
    this.NBATeamsColors.set('WAS', new NBATeamColors('#002b5c', '#e31837'));
  }

  getPromise(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("Promise to " + url);
      this.http.get(url).subscribe(success => resolve(success), error => reject(error));
    });
  }

  getLinksPromise(): Promise<any> {
    return this.getPromise(this.nbaApiUrl + "/prod/v1/today.json");
  }

  getSchedulePromise(): Promise<any> {
    return this.getPromise(this.nbaApiUrl + this.links.leagueSchedule);
  }

  getTeamInfoPromise(): Promise<any> {
    return this.getPromise(this.nbaApiUrl + this.links.teamsConfig);
  }

  getRosterPromise(team: NBATeam): Promise<any> {
    let rosterUrl = this.links.teamRoster.replace("{{teamUrlCode}}", team.teamId);
    return this.getPromise(rosterUrl);
  }

  getPlayerPromise(): Promise<any> {
    return this.getPromise(this.nbaApiUrl + this.links.leagueRosterPlayers);
  }

  getPlayerSeasonStatsPromise(player: NBAPlayer): Promise<any> {
    let profileUrl = this.links.playerProfile.replace("{{personId}}", player.personId.toString());
    return this.getPromise(profileUrl);
  }

  getPlayerLastGameStatsPromise(player: NBAPlayer): Promise<any> {
    let gamelogUrl = this.links.playerGameLog.replace("{{personId}}", player.personId.toString());
    return this.getPromise(gamelogUrl);
  }

}
