import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  faculties: any = [{id:1, name: "ESTEM"},{id:2,name:"health"},{id:3,name:"whatever"}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getFaculties(){
    console.log('getFaculties HomePage');
  }

  getItem

  /*Search*/
  searchInput(event: any){

  }
}
