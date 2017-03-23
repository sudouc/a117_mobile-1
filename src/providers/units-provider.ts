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

    public getUnit(unit_id){
        // Make a request for a specific unit

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.UNITS + '/' + unit_id
                ).map(
                    // map is just a function that gets applied no matter what comes back
                    // in this case we use it to always convert the object to a json representation of the response body
                    (response) => response.json()
                ).subscribe(
                    (data) => {
                        console.log(data);
                        observable.next();
                        observable.complete();
                    },
                    (error) => {
                        console.log(error);
                        observable.error(error);
                    }
                )
            }
        );
    }

}
