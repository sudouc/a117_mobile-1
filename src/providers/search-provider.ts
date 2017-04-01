import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints } from '../app/constants';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public http: Http) {
    console.log('Hello SearchProvider Provider');
  }

  public getSearchResult(input){

    return Observable.create(
        (observable) => {
            this.http.get(ApiEndpoints.SEARCH + "/?=" + input)
            .map((response) => response.json())
            .subscribe(
                (data) => {
                    console.log(data);
                    observable.next();
                    observable.complete();
                },
                (error) => {
                    console.log(error);
                    observable.error(error);
                })
        }
    );
  }
}
