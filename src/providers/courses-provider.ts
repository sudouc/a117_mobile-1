import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ApiEndpoints, AppConstants } from '../app/constants';

/*
  Generated class for the CoursesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CoursesProvider {

    courses: Array<{name: string, course_code: string, id: number}>;
    details: {name: string, unit_code: string};

    constructor(public http: Http) {
        console.log('Hello CoursesProvider Provider');
    }

    public getCourses() {
        // Make a request for a specific course

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.UNITS + '/' + AppConstants.ALL)
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
                        //store data in course list
                        this.getList(data);
                        observable.next(true);
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

    public getCourse(id) {
        // Make a request for a specific course

        // Encapsulating the whole request in an observable means we avoid race conditions with two subscribers (one in this service and in the subscriber)
        return Observable.create(
            (observable) => {
                // Make the HTTP request
                this.http.get(ApiEndpoints.UNITS + '/' + id)
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
                        console.log(data.name);
                        let dataName = data.name;
                        let dataUnitCode = data.unit_code;
                        console.log(dataName);
                        this.setCourseDetails(dataName, dataUnitCode);
                        observable.next(true);
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

    public setCourseDetails(dataName, dataUnitCode){ 
        this.details = {name: "", unit_code: ""};
        this.details.name = dataName;
        this.details.unit_code = dataUnitCode;
        console.log(this.details);
    }

    public getCourseDetails(){
        console.log(this.details);
        return this.details;
    }

    public getList(data){
        this.courses = [];

        for (let i = 0; i < data.length; i++) {
            this.courses.push({
                name: data[i].name,
                course_code: data[i].unit_code,
                id: data[i].id
            });
        }
        // this.courses = [
        //     {
        //         name: "Bachelor of Engineering in Network and Software Engineering",
        //         course_code: "344JA",
        //         id: 0
        //     },
        //     {
        //         name: "Bachelor of Software Engineering",
        //         course_code: "560AA",
        //         id: 1
        //     },
        //     {
        //         name: "Bachelor of Sports Media",
        //         course_code: "698AA",
        //         id: 2
        //     },
        //     {
        //         name: "Bachelor of Communication in Media and Public Affairs",
        //         course_code: "213JA",
        //         id: 3
        //     },
        //     {
        //         name: "Bachelor of Communication in Advertising",
        //         course_code: "211JA",
        //         id: 4
        //     },
        //     {
        //         name: "Bachelor of Science in Psychology",
        //         course_code: "780AA",
        //         id: 5
        //     }
        // ]
        return this.courses;
    }

     public getCourseList(){
        // this.courses = [];

        // for (let i = 0; i < data.length; i++) {
        //     this.courses.push({
        //         name: data[i].name,
        //         course_code: data[i].unit_code,
        //         id: data[i].id
        //     });
        // }
         return this.courses;
    }

}
