import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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

  getCurrentWeek(): Array<string> {

    let dayNumber = this.today.getDay(); //0-6
    let monday = new Date();
    let weekDays = new Array<Date>();
    let weekDaysStr = new Array<string>();

    // Sets to Monday
    monday.setDate(this.today.getDate() - (dayNumber - 1));

    for (let i = 0; i < 7; i++) {
      let current = new Date();
      current.setDate(monday.getDate() + i);
      let toAdd = new Date(current);
      weekDays.push(toAdd);
    }
    console.log(weekDays);

    let index = 0;

    for (let day of weekDays) {
      weekDaysStr[index] = this.dateToString(day);
      index++;
    }

    console.log(weekDaysStr);
    return weekDaysStr;
  }

}
