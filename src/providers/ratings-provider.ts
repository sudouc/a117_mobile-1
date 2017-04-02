import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints, ApiExtensions } from '../app/constants';
/*
  Generated class for the RatingsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RatingsProvider {

  constructor(public http: Http) {
    console.log('Hello RatingsProvider Provider');
  }

  public getRatingsByUnitId(unit_id){
      return Observable.create(
          (observable) => {
              this.http.get(ApiEndpoints.UNITS + '/' + unit_id + ApiExtensions.RATINGS) // Http GET request
              .map(response => response.json()) // Convert to a JSON object
              .subscribe(
                  (data) => {
                      console.log(data);
                      observable.next(data);
                      observable.complete();
                  },
                  (error) => {
                      console.log(error);
                      observable.error(error);
                  })
          }
      )
  }

  public getRatingsById(id){
    return Observable.create(
        (observable) => {
            this.http.get(ApiEndpoints.UNITS + ApiExtensions.RATINGS + '/' + id) //This probably needs fixing/tweaking
            .map(response => response.json())
            .subscribe(
                (data) => {
                    console.log(data);
                    observable.next(data);
                    observable.complete();
                },
                (error) => {
                    console.log(error);
                    observable.error(error);
                })
        }
    )
  }

}
