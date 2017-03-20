import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service'

/*
  Class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    // Variable for binding to the loading message
    loading: Loading;
    // Flag to indicate whether or not the register request has been successful
    createSuccess = false;
    // Variable for binding to the form values
    registerCredentials = { email: '', password: '', name: '' };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private auth: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    // Attempt to register a user with the information currently in the form
    public register() {
        // present the loading dialog while we submit the data
        this.showLoading();

        // Call the register method on our auth service with the data from the form
        // and subscribe to the result
        this.auth.register(this.registerCredentials).subscribe(
            // Observable completed OK anonymous function
            (success) => {
                if (success) {
                    this.createSuccess = true;
                    this.showPopup("Success", "Account created. You can now log in.");
                    // We may want to do the login here and log straight in
                    // Currently we just return them to the login screen
                } else {
                    this.showPopup("Error", "Problem creating account.");
                }
            },
            // Error completing Observable anonymous function
            (error) => {
                this.showPopup(error.error, error.message);
            });
    }

    // Show an popup message, with a handler callback attached to a button
    // https://ionicframework.com/docs/v2/api/components/alert/AlertController/
    showPopup(title, text) {
        // first, dismiss the loading dialog that will be present
        this.loading.dismiss();

        // Create the alert and populate it's fields
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        // handler will pop the navigation back to the screen that directed us here
                        // if the this.createSuccess flag is true
                        if (this.createSuccess) {
                            this.navCtrl.popToRoot();
                        }
                    }
                }
            ]
        });

        // Show the alert to the user
        alert.present();
    }

    // Show a loading message
    // https://ionicframework.com/docs/v2/api/components/loading/LoadingController/
    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

}
