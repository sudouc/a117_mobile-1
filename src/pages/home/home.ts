import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitsPage } from '../units/units';
import { CoursesPage } from '../courses/courses';
import { CurrentUserPage } from '../currentuser/currentuser';
import { SearchProvider } from '../../providers/search-provider';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchString: string = '';
  searchItem: any;
  placeholderItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getPlaceholderItems();
  }

  getPlaceholderItems(){
      this.placeholderItems = [
          {id:1, name: "ESTEM"},
          {id:2,name:"health"},
          {id:3,name:"whatever"}];
  }

  public searchCancel(){
      this.getPlaceholderItems();
  }

  public itemSelected(item){
      console.log("Selected: " + JSON.stringify(item));
  }

  public searchUnits()
  {
    this.navCtrl.push(UnitsPage, {
      searchParam: this.searchString
    });
  }

  public searchCourses()
  {
    this.navCtrl.push(CoursesPage, {
      searchParam: this.searchString
    });
  }

  public goToUser()
  {
     this.navCtrl.push(CurrentUserPage, {

    });
  }

  public selectReviews()
  {

  }
}
