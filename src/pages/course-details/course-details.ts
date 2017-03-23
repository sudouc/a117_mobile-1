import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CoursesProvider } from '../../providers/courses-provider';

/*
  Generated class for the CourseDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-course-details',
    templateUrl: 'course-details.html'
})
export class CourseDetailsPage {
    course: any; // It would be a good idea to more strongly type this

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private coursesProvider: CoursesProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CourseDetailsPage');
    }

    ionViewWillEnter() {
        // Fetch the course details
        this.getCourse();
        // TODO fetch comments + display them (if we're allowing comments on Courses?)
    }

    getCourse() {
        // Grab the unit id out of the nav parameter
        let id = this.navParams.get('id');

        // Request the unit details from the provider
        // We may want to show a loading icon while this is happening
        this.coursesProvider.getCourse(id).subscribe(
            (data) => {
                this.course = data;
            },
            (error) => {
                // Currently we're just displaying the error
                // We may want to instead show a popup
                this.course = error;
            }
        )
    }

    // TODO, fetch comments

}
