import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UnitsProvider } from '../../providers/units-provider';
import { UnitDetailsPage } from '../unit-details/unit-details';

/*
  Units List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-units',
    templateUrl: 'units.html'
})
export class UnitsPage {
    searchText: string = '';
    items: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private unitsProvider: UnitsProvider, private alertCtrl: AlertController) { }

    ionViewWillLoad() {
        if (this.navParams.get('searchParam')) {
            this.searchText = this.navParams.get('searchParam');
        }
        this.searchUnitDataList();
    }

    // Handler for presses on the cancel button
    public searchCancel(event: any) {
        this.searchUnitDataList();
    }

    public searchUnitDataList() {
        this.unitsProvider.searchUnit(this.searchText).subscribe(
            (success) => {
                this.items = success;
            },
            (error) => {
                this.showError(error.message);
            }
        )
    }

    public showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

    // Handler for the search bar input. Ionic debounces this for us (~250ms min between calls)
    // Though that can be changed https://ionicframework.com/docs/v2/api/components/searchbar/Searchbar/
    // We don't actually use the contents of the event parameter in this one, but we could get the sample text from it rather than from
    public searchInput() {
        this.searchUnitDataList();
    }

    // Click callback when one of the items in the list is clicked on
    // We use this to navigate to a details view, passing the item ID
    // so that we can fetch further information on that from the API
    public itemSelected(item) {
        console.log('Item selected: ' + item.id + " " + item.unit_code + " " + item.name)

        this.navCtrl.push(
            UnitDetailsPage,
            // Provide the unit id as a nav parameter
            { unit_id: item.id }
        );
    }

    public showContent() {
        return !!this.items;
    }
}
