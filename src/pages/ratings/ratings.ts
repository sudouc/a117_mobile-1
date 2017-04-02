import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UnitsProvider } from '../../providers/units-provider';

import { UnitsPage } from '../units/units';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login'; 

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
    ratings: any = {
        difficulty: 50,
        engagement: 50,
        satisfaction: 50,
        enjoyment: 50,
        practicality: 50
    }
    count: number = 0;
    changed: Set<string> = new Set();
    id: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private unitsProvider: UnitsProvider, private auth: AuthService) { }

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

    presentIncompleteSubmissionAlert() {
        let alert = this.alertCtrl.create({
            title: 'Incomplete',
            subTitle: "You must submit a rating for all areas to make your rating count. Perhaps you didn't edit all sliders?",
            buttons: ['Dismiss']
        });
        alert.present();
    }

     presentConfirmationAlert() {
        let alert = this.alertCtrl.create({
            title: 'Your Rating Has Been Counted',
            subTitle: "Feel free to submit as many ratings as you like ;)",
            buttons: ['OK']
        });
        alert.present();
    }

    validateAndSubmit() {
        if (this.changed.size == 5) {
            console.log("You have submitted your ratings:\n" +
                "Difficulty: " + this.ratings.difficulty + "\n" +
                "Engagement: " + this.ratings.engagement + "\n" +
                "Satisfaction: " + this.ratings.satisfaction + "\n" +
                "Enjoyment: " + this.ratings.enjoyment + "\n" +
                "Practicality: " + this.ratings.practicality + "\n");
            this.id = this.unit.id;
            console.log(this.id);
            this.submit();
        }
        else {
            this.presentIncompleteSubmissionAlert();
        }
    }

    public submit() {
        // if (this.auth.isLoggedIn()){   // If we don't have a stored user object, fire off a request
            this.unitsProvider.setRating(this.id, this.ratings).subscribe(
            (success) => {
                if (success) {
                    
                    console.log(success);
                    // We may want to do the login here and log straight in
                    // Currently we just return them to the login screen
                } else {
                   console.log("not successful");
                }
            },
            // Error completing Observable anonymous function
            (error) => {
                console.log("submit " + error);
            });
            
        // }
        // else{
        //     this.navCtrl.push(LoginPage);

        // }
    }
        // this.unitsProvider.setRating(this.id, this.ratings).subscribe(
        //     (success) => {
        //         // 'success' is the return value of the observable, the AuthService.login method resolves true for this, but if success is being called we don't really care about the value, we're just going to switch to the CurrentUserPage
        //         // this.loading.dismiss();
        //         // TODO: Root may change depending on where we got to the login page from (use a separate statement with a switch?)
        //         this.presentConfirmationAlert();
        //         this.navCtrl.setRoot(UnitsPage);
        //     },
        //     (error) => {
        //         // This second anonymous method is called if there is some error with the observable
        //         console.log("add rating" + error);
        //     });

    

}
