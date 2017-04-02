import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitsProvider } from '../../providers/units-provider';
import { RatingsProvider } from '../../providers/ratings-provider';

/*
  Generated class for the UnitDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-unit-details',
    templateUrl: 'unit-details.html'
})
export class UnitDetailsPage {
    unit: any; // It would be a good idea to more strongly type this
    ratings: JSON[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private unitsProvider: UnitsProvider,
        private ratingsProvider: RatingsProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UnitDetailsPage');
    }

    ionViewWillEnter() {
        // Fetch the unit details
        this.getUnit();
        this.getRatings();
        // TODO fetch comments + display them
    }

    getUnit() {
        // Grab the unit id out of the nav parameter
        let unit_id = this.navParams.get('unit_id');


        // Request the unit details from the provider
        // We may want to show a loading icon while this is happening
        this.unitsProvider.getUnit(unit_id).subscribe(
            (data) => {
                console.log(data);
                this.unit = data;
            },
            (error) => {
                // Currently we're just displaying the error
                // We may want to instead show a popup
                this.unit = error;
            }
        )
    }

    getRatings(){
        let unit_id = this.navParams.get('unit_id');

        this.ratingsProvider.getRatingsByUnitId(unit_id).subscribe(
            (data) => {
                console.log("ratings:"+data);
                this.ratings = data;
            },
            (error) => {
                this.ratings = error;
            }
        )
    }

    // TODO, fetch comments

}
