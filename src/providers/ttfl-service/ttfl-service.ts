import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the TtflProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TtflProvider {
  baseUrl: string = 'http://localhost:3000/api/';


  constructor(public http: HttpClient) {
    console.log('Hello TtflProvider Provider');
  }

  createTfflPlayer() {
    let url = this.baseUrl + "ttflPlayer";
    //this.http.post(url,)
  }

}
