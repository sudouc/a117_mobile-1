import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service'
import { RegisterPage } from '../register/register'
import { CurrentUserPage } from '../currentuser/currentuser'

/*
  Class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.

  This class handles logging the user in
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // Variable for binding to the loading message
    loading: Loading;
    // Variable for binding to the form values
    loginCredentials = { email: '', password: '' };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private auth: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    // Open the register page
    public goToRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }

    // Attempt a login with the credentials currently in the login form
    public login() {
        // present the loading dialog while we submit the data
        this.showLoading();

        // Subscribe to the result of the login attempt and then
        this.auth.login(this.loginCredentials).subscribe(
            (allowed) => {
                // 'allowed' is the return value of the observable, in this case it's a boolean
                // This first anonymous method is called when the observable completes successfully
                if (allowed) {
                    this.loading.dismiss();
                    // TODO: Root may change depending on where we got to the login page from (use a separate statement with a switch?)
                    this.navCtrl.setRoot(CurrentUserPage);
                } else {
                    this.showError("Access Denied");
                }
            },
            (error) => {
                // This second anonymous method is called if there is some error with the observable
                this.showError(error);
            });
    }

    // Show a loading message
    // https://ionicframework.com/docs/v2/api/components/loading/LoadingController/
    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    // Show an error message
    // https://ionicframework.com/docs/v2/api/components/alert/AlertController/
    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

}
