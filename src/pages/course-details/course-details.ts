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
    course: {name: string, unit_code: string}; // It would be a good idea to more strongly type this
    course2: {name: string, unit_code: string}; 
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private coursesProvider: CoursesProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CourseDetailsPage');
    }

    ionViewWillEnter() {
        // Fetch the course details
        this.course = {name: "", unit_code: ""};
        this.getCourse();
        this.course2.name = "Testing";
        this.course2.unit_code = "Unit Code Test"
        // TODO fetch comments + display them (if we're allowing comments on Courses?)
    }

    getCourse() {
        // Grab the unit id out of the nav parameter
        let id = this.navParams.get('id');

        console.log(id);

        // Request the unit details from the provider
        // We may want to show a loading icon while this is happening
        this.coursesProvider.getCourse(id).subscribe(
            (data) => {
                // this.course.name = data.name;
                // this.course.course_code = data.unit_code;
                console.log(id);
                this.course = this.coursesProvider.getCourseDetails();

                console.log(this.course);
                console.log(this.course.name);
                console.log(data);
                this.course = data;
                console.log(this.course);
                
                // console.log(this.course.name);
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
