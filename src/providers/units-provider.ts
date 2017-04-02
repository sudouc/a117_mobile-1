import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints } from '../app/constants';

/*
  Generated class for the UnitsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UnitsProvider {

    constructor(public http: Http) {
        console.log('Hello UnitsProvider Provider');
    }

    public getUnits() {
        //request all units

       return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.UNITS)
                    .map((response) => response.json())
                    // map is just a function that gets applied no matter what comes back
                    // in this case we use it to always convert the object to a json representation of the response body
                    .subscribe(
                    // To the subscribe method we pass several anonymous methods that are called
                    // Under different circumstances (e.g. success, error)
                    // Check the docs for more info
                    // http://reactivex.io/documentation/operators/subscribe.html
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
        );
    }

    public getUnit(unit_id) {
        // Make a request for a specific unit

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.UNITS + '/' + unit_id)
                    .map((response) => response.json())
                    // map is just a function that gets applied no matter what comes back
                    // in this case we use it to always convert the object to a json representation of the response body
                    .subscribe(
                    // To the subscribe method we pass several anonymous methods that are called
                    // Under different circumstances (e.g. success, error)
                    // Check the docs for more info
                    // http://reactivex.io/documentation/operators/subscribe.html
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
        );
    }

    // Search for units
    public searchUnit(searchString){
        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.SEARCH_UNIT + '/' + searchString)
                    .map((response) => response.json())
                    .subscribe(
                    (data) => {
                        observable.next(data);
                        observable.complete();
                    },
                    (error) => {
                        observable.error(error);
                    }
                )
            }
        );
    }
}
