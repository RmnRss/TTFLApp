import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NBALinks} from "../../class/NBA/NBALinks";
import {NBATeam} from "../../class/NBA/NBATeam";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";
import {NBATeamColors} from "../../class/NBA/NBATeamColors";
import {NBAGame} from "../../class/NBA/NBAGame";

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
    this.initNBATeamsColors();
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

  getNBATeam(nbaTeam: NBATeam): Promise<any> {
    let url = this.nbaApiUrl + this.links.teamsConfig;

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((allTeams: any) => {

        for (let team of allTeams.teams.config) {
          if (nbaTeam.teamId == team.teamId) {
            nbaTeam.tricode = team.tricode;
            nbaTeam.ttsName = team.ttsName;
            nbaTeam.colors = this.NBATeamsColors.get(team.tricode);
          }
        }

        resolve(nbaTeam);
      }, error => {
        reject(error);
      });
    });


  }

  getNBATeamRoster(team: NBATeam): Promise<any> {
    let url = this.nbaApiUrl + this.links.teamRoster.replace("{{teamUrlCode}}", team.teamId);

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((fullRoster: any) => {
        let roster = new Array<NBAPlayer>();

        for (let player of fullRoster.league.standard.players) {
          let tempPlayer = new NBAPlayer();
          tempPlayer.personId = player.personId;

          this.getNBAPlayer(tempPlayer.personId)
            .then(player => {
              tempPlayer = player;
            })
            .then(res => {
              this.getPlayerSeasonStatsPromise(tempPlayer)
                .then(player => {
                  tempPlayer = player;
                  roster.push(tempPlayer);
                })
            });
        }
        resolve(roster);
      }, error => {
        reject(error);
      });
    })
  }

  getNBAPlayer(id: number): Promise<any> {
    let url = this.nbaApiUrl + this.links.leagueRosterPlayers;

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((allPlayers: any) => {
        let nbaPlayer = new NBAPlayer();
        nbaPlayer.personId = id;

        for (let player of allPlayers.league.standard) {
          if (nbaPlayer.personId == player.personId) {
            nbaPlayer.firstName = player.firstName;
            nbaPlayer.lastName = player.lastName;
            nbaPlayer.jersey = player.jersey;
            nbaPlayer.pos = player.pos;

            nbaPlayer.team = new NBATeam();
            nbaPlayer.team.teamId = player.teams[player.teams.length - 1].teamId;

            this.getNBATeam(nbaPlayer.team)
              .then(team => {
                nbaPlayer.team = team;
              });
          }
        }
        resolve(nbaPlayer);
      }, error => {
        reject(error);
      });
    });
  }

  getPlayerSeasonStatsPromise(player: NBAPlayer): Promise<any> {
    let url = this.nbaApiUrl + this.links.playerProfile.replace("{{personId}}", player.personId.toString());
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        let seasonStats = res.league.standard.stats.latest;
        player.ppg = seasonStats.ppg;
        player.rpg = seasonStats.rpg;
        player.apg = seasonStats.apg;
        resolve(player);
      }, error => {
        reject(error);
      });
    });
  }

  getPlayerLastGameStatsPromise(player: NBAPlayer): Promise<any> {
    let gamelogUrl = this.nbaApiUrl + this.links.playerGameLog.replace("{{personId}}", player.personId.toString());
    return this.getPromise(gamelogUrl);
  }

  getGames(date: string): Promise<any> {
    let url = this.nbaApiUrl + this.links.leagueSchedule;

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((schedule: any) => {
        let NBAGames = new Array<NBAGame>();
        let allNBAGames = schedule.league.standard;

        for (let anNBAGame of allNBAGames) {

          let tempNBAGame = new NBAGame();
          tempNBAGame.startDateEastern = date;

          if (anNBAGame.startDateEastern == tempNBAGame.startDateEastern) {
            tempNBAGame.startTimeUTC = anNBAGame.startTimeUTC;

            // Home team
            tempNBAGame.hTeam.teamId = anNBAGame.hTeam.teamId;
            tempNBAGame.hTeam.wins = anNBAGame.hTeam.win;
            tempNBAGame.hTeam.loss = anNBAGame.hTeam.loss;

            // Visitor team
            tempNBAGame.vTeam.teamId = anNBAGame.vTeam.teamId;
            tempNBAGame.vTeam.wins = anNBAGame.vTeam.win;
            tempNBAGame.vTeam.loss = anNBAGame.vTeam.loss;

            NBAGames.push(tempNBAGame);
          }
        }
        resolve(NBAGames);
      }, error => {
        reject(error);
      });
    });
  }

  private initNBATeamsColors() {
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
}
