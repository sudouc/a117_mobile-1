import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints, AppConstants, ApiExtensions } from '../app/constants';
import { AuthService } from '../../src/providers/auth-service';

/*
  Generated class for the UnitsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UnitsProvider {

    oauth: any = null;
    submitted: boolean = false;
    ratingData: any;
    
    constructor(public http: Http, private auth: AuthService) {
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

//  public requestUser(): Observable<Response> {

//         let options = new RequestOptions({ headers: this.getHeaders() });
//         let userRequest = this.http.get(ApiEndpoints.USER, options);

//         userRequest.subscribe(
//             (data) => {
//                 this.currentUser = data.json();
//             }
//         )

//         return userRequest;
//     }

    public setRating(unit_id, rating):  Observable<boolean> {

        let options = new RequestOptions({ headers: this.auth.getHeaders() });
        let body = {
                    "difficult": rating.difficult,
                    "satisfaction": rating.satisfication,
                    "engagement": rating.engagement,
                    "assistance": rating.enjoyment,//TODO change to assistance here and in RatingsPage
                    "practicality": rating.practicality
                };
        // let ratingCreate = this.http.post(ApiEndpoints.UNITS + '/' + 23 + ApiExtensions.RATING_ADD, body, options);

        return Observable.create(
            (observer) => {
                this.http.post(ApiEndpoints.UNITS + '/' + 23 + ApiExtensions.RATING_ADD, options, body).subscribe(
                    (success) => {
                        // In the request success re notify our subscriber that the request succeeded
                        observer.next(true);
                        observer.complete();
                    },
                    (error) => {
                        // Give the error to the subscriber to deal with
                        console.log(error.json());
                        observer.error(error.json());
                    }
                )
            });
        // ratingCreate.subscribe(              
        //             (data) => {
        //                 console.log(data.json());
        //                 this.ratingData = data.json();
        //             }
        //             // ,
        //             // (error) => {
        //             //     console.error(error.json());
        //             // }
        //         )
        // return ratingCreate;
    }

}
