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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseUnitsPage');
  }

}
