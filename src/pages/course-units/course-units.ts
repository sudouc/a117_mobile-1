import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CoursesProvider } from '../../providers/courses-provider';

/*
  Generated class for the CourseUnits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-course-units',
    templateUrl: 'course-units.html'
})
export class CourseUnitsPage {
    courseUnits: any;
    courseString: any;
    name: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private coursesProvider: CoursesProvider) {
        this.courseUnits = { name: "", course_code: "" }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CourseUnitsPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter CourseUnitsPage');
        this.getCourseUnits();
        // TODO fetch comments + display them (if we're allowing comments on Courses?)
    }

    getCourseUnits() {
        // Grab the unit id out of the nav parameter
        let id = this.navParams.get('id');
        this.name = this.navParams.get('name');
        console.log("gotname: " + this.name);

        // Request the unit details from the provider
        // We may want to show a loading icon while this is happening
        this.coursesProvider.getCourseUnits(id).subscribe(
            (data) => {
                this.courseUnits = data;
            },
            (error) => {
                // Currently we're just displaying the error
                // We may want to instead show a popup
                this.courseUnits = error;
            }
        )
    }

}
