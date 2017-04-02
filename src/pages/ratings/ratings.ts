import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the Ratings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html'
})
export class RatingsPage {

    unit: any;
    difficulty: number = 50;
    engagement: number = 50;
    satisfaction: number = 50;
    enjoyment: number = 50;
    practicality: number = 50;
    count: number = 0;
    changed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.changed = {difficult: 0, engage: 0, satisfy: 0, enjoy: 0, practical: 0};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingsPage');
  }

  ionViewWillEnter() {
    // Fetch the unit details
    this.unit = this.navParams.get('unit');
    console.log(this.unit);
    // TODO fetch comments + display them
  }

  onChange(changedArea){

    if(changedArea == 'difficult'){
        if(this.changed.difficult == 0){
            this.changed.difficult ++;
        }
        console.log(this.difficulty);
    }
    else if(changedArea == "engage"){
        if(this.changed.engage == 0){
            this.changed.engage ++;
        }
        console.log(this.engagement);
    }
    else if(changedArea == 'satisfy'){
        if(this.changed.satisfy == 0){
            this.changed.satisfy ++;
        }
        console.log(this.satisfaction);
    }
    else if(changedArea == "enjoy"){
        if(this.changed.enjoy == 0){
            this.changed.enjoy ++;
        }
        console.log(this.enjoyment);
    }
    else if(changedArea == "practical"){
        if(this.changed.practical == 0){
            this.changed.practical ++;
        }
        console.log(this.practicality);
    }
    this.count = this.changed.difficult + this.changed.engage +
    this.changed.satisfy + this.changed.enjoy + this.changed.practical;
  }

  submit(){
    if(this.count == 5){
        console.log("You have submitted your ratings:\n" +
        "Difficulty: " + this.difficulty + "\n" +
        "Engagement: " + this.engagement + "\n" +
        "Satisfaction: " + this.satisfaction + "\n" +
        "Enjoyment: " + this.enjoyment + "\n" +
        "Practicality: " + this.practicality + "\n");
        //send to api
    }
    else {
        console.log("You must submit a rating for all areas to make your rating count.");
    }
    console.log(this.changed.difficult, this.changed.engage, this.changed.satisfy, this.changed.enjoy, this.changed.practical);
  }


}
