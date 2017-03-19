import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

  This class is responsible for handling our authentication state
*/
@Injectable()
export class AuthService {
    currentUser: User;

    constructor(public http: Http) {
        console.log('Hello AuthService Provider');
    }

    // Template method for submitting login request
    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                // At this point make a request to your backend to make a real check!
                let access = (credentials.password === "pass" && credentials.email === "email");
                this.currentUser = new User('Test User', 'test@example.com');
                observer.next(access);
                observer.complete();
            });
        }
    }

    // Template method for submitting register request
    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            // At this point store the credentials to your backend!
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    // Return the current user object
    public getUserInfo(): User {
        return this.currentUser;
    }

    // Template method for logging out the current user
    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }

}
