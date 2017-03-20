import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService, User } from '../../providers/auth-service'
import { LoginPage } from '../login/login';

/*
  Generated class for the CurrentUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-currentuser',
    templateUrl: 'currentuser.html'
})
export class CurrentUserPage {
    currentUser: User;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private auth: AuthService) { }

    // Lifecycle event, we are using it as a hook to see if we are authenticated
    // and performing a navigation change if we are not authenticated
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    ionViewCanEnter() {
        console.log('ionViewCanEnter CurrentUserPage');

        // If we're not logged in, navigate to the login screen
        if (!this.auth.getUserInfo()) {
            this.navCtrl.setRoot(LoginPage); // TODO, use a parameter to say which page we were coming from so we can be redirected after login
        }
        // Don't return anything because that would actually interrupt the navigation flow and
        // show a blank screen (we have no way to catch the navigation error when using tabs)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CurrentUserPage');
    }

}
