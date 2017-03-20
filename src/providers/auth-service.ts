import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AppConstants, ApiEndpoints } from '../app/constants';

/*

  Class to represent a User

 */
export class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

/*
  Class for the AuthService provider

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.

  This class is responsible for handling our authentication state and letting us fetch a user
*/
@Injectable()
export class AuthService {
    currentUser: User;
    oauth: any = null;

    constructor(public http: Http) {
        console.log('Hello AuthService Provider');
    }

    // Submit a login request
    public login(credentials): Observable<boolean> {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {

                // The JSON request body we fill out
                let requestBody = {
                    "grant_type": AppConstants.GRANT_TYPE,
                    "client_id": AppConstants.CLIENT_ID,
                    "client_secret": AppConstants.CLIENT_SECRET,
                    "username": credentials.email,
                    "password": credentials.password,
                    "scope": AppConstants.SCOPE
                };

                // The login http request
                this.http.post(ApiEndpoints.OAUTH_TOKEN, requestBody).subscribe(
                    (data) => {
                        console.log(data.json());
                        // Store the token and refresh token for later use getting data
                        this.oauth = data.json();

                        // Provide feedback to the subscriber that we have completed successfully
                        observable.next(true);
                        observable.complete();
                    },
                    (error) => {
                        console.error(error.json());
                        // Discard the token, it's not necessary
                        this.oauth = null;
                        // Give the error to the subscriber to deal with
                        observable.error(error.json());
                    }
                )
            });
    }

    // Submit register request
    public register(userInfo): Observable<boolean> {
        if (userInfo.email === null || userInfo.password === null || userInfo.name === null) {
            return Observable.throw("Please insert credentials");
        }

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observer) => {
                this.http.post(ApiEndpoints.USER_CREATE, userInfo).subscribe(
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
    }

    // Get the user if there is one
    public getUser() {
        return this.currentUser;
    }

    // Request the user details
    public requestUser(): Observable<Response> {

        let options = new RequestOptions({ headers: this.getHeaders() });
        let userRequest = this.http.get(ApiEndpoints.USER, options);

        userRequest.subscribe(
            (data) => {
                this.currentUser = data.json();
            }
        )

        return userRequest;
    }

    // Get Authentication Headers
    getHeaders() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.oauth.access_token)
        return headers;
    }

    // Return true if logged in, else false
    public isLoggedIn() {
        return !!this.oauth;
    }

}
