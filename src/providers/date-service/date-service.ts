import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TtflPick} from "../../class/ttflPick";

@Injectable()
export class DateServiceProvider {

  today: Date;

  constructor(public http: HttpClient) {
    this.today = new Date();
  }

  getTodaysDate(): string {
    return this.dateToString(this.today);
  }

  dateToString(date: Date): string {

    let monthStr = "";
    let dayStr = "";

    let day = date.getDate();
    let month = date.getMonth() + 1; //January is 0
    let year = date.getFullYear();

    if (day < 10) {
      dayStr = '0' + day.toString();
    } else {
      dayStr = day.toString();
    }

    if (month < 10) {
      monthStr = '0' + month.toString();
    } else {
      monthStr = month.toString();
    }

    return year.toString() + monthStr + dayStr;

  }

  weekCount(year, month_number): number {
    let firstOfMonth = new Date(year, month_number - 1, 1);
    let lastOfMonth = new Date(year, month_number, 0);

    let used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  getCurrentWeek(): Array<TtflPick> {
    let weekPicks = new Array<TtflPick>();

    let curr = new Date();

    for (let i = 1; i <= 7; i++) {
      let pick = new TtflPick(this);

      // first day of the week
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));

      pick.date = day;
      weekPicks.push(pick);
    }

    return weekPicks;
  }

}
