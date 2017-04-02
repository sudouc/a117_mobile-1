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

    constructor(public navCtrl: NavController, public navParams: NavParams, private unitsProvider: UnitsProvider, private alertCtrl: AlertController) {
        if (navParams.get('searchParam')){
         this.searchText = navParams.get('searchParam');
        }
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UnitsPage ' + this.searchText);
        this.getItems();
    }

    // Helper method that gets us a clean list of items
    // This could actually be a web API call or we could be loading from memory or storage
    getItems() {
        this.unitsProvider.getUnits().subscribe(
            (success) => {
                // 'success' is the return value of the observable,
                // the CourseProvider.getCourses method resolves with a list object for this
                this.items = success;
            },
            (error) => {
                // This second anonymous method is called if there is some error with the observable
                this.showError(error.message);
            });
    }

    // Handler for presses on the cancel button
    public searchCancel(event: any) {
        // Reset this list of units to default (the search bar is cleared automatically by ionic)
        this.getItems();
        // This could be a web request to repopulate the list, or restore from storage for speed
    }

     public searchUnitDataList(){
        this.unitsProvider.searchUnit(this.searchText).subscribe(
            (success) => {
                console.log(this.items = success);
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
        // Reset items back to all of the items

        // If the value is an empty/whitespace string don't filter the items, there would be no point
        if(this.searchText && this.searchText.trim() != ''){
            this.searchUnitDataList();
        } else {
            this.getItems();
        }

        // TODO: Show a message if there were no items found
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
