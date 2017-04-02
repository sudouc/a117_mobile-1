import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    ratings = {
        difficulty: 50,
        engagement: 50,
        satisfaction: 50,
        enjoyment: 50,
        practicality: 50
    }
    count: number = 0;
    changed: Set<string> = new Set();

    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RatingsPage');
    }

    ionViewWillEnter() {
        // Fetch the unit details
        this.unit = this.navParams.get('unit');
        console.log(this.unit);
        // TODO fetch comments + display them
    }

    onChange(changedArea) {
        this.changed.add(changedArea);
    }

    submit() {
        if (this.changed.size == 5) {
            console.log("You have submitted your ratings:\n" +
                "Difficulty: " + this.ratings.difficulty + "\n" +
                "Engagement: " + this.ratings.engagement + "\n" +
                "Satisfaction: " + this.ratings.satisfaction + "\n" +
                "Enjoyment: " + this.ratings.enjoyment + "\n" +
                "Practicality: " + this.ratings.practicality + "\n");
            //send to api
        }
        else {
            this.presentIncompleteSubmissionAlert();
        }
    }

    presentIncompleteSubmissionAlert() {
        let alert = this.alertCtrl.create({
            title: 'Incomplete',
            subTitle: "You must submit a rating for all areas to make your rating count. Perhaps you didn't edit all sliders?",
            buttons: ['Dismiss']
        });
        alert.present();
    }

}
