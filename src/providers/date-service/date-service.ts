import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GameDay} from "../../class/GameDay";
import {DatePipe} from "@angular/common";

@Injectable()
export class DateServiceProvider {

  today: Date;

  constructor(public http: HttpClient, private datePipe: DatePipe) {
    this.today = new Date();
  }

  /***
   * Formats the date to a string we can use with the NBA API
   * @param date
   */
  dateToNBAString(theDate: Date): string {
    return this.datePipe.transform(theDate, 'yyyy' + 'MM' + 'dd');
  }

  /***
   * Counts the number of weeks starting from a specific date
   * @param year
   * @param month_number
   */
  weekCount(year, month_number): number {
    let firstOfMonth = new Date(year, month_number - 1, 1);
    let lastOfMonth = new Date(year, month_number, 0);

    let used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  /***
   * returns the current week
   */
  getCurrentWeek(): Array<GameDay> {
    //TODO: Fix bug for sundays

    let weekDays = new Array<GameDay>();

    //let curr = new Date('January 19, 2019');
    let curr = new Date('June 08, 2019');

    for (let i = 1; i <= 7; i++) {
      let gameDay = new GameDay();

      // first day of the week
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));

      gameDay.date = day;
      weekDays.push(gameDay);
    }

    return weekDays;
  }

  /***
   * returns a week based on its number
   * @param weekNumber
   */
  getWeek(weekNumber: number): Array<GameDay> {
    let weekDays = new Array<GameDay>();

    //TODO: Implement

    return weekDays;
  }

}
