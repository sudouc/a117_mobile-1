import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private unitsProvider: UnitsProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UnitsPage');

        // Populate the list of items when this view loads
        this.getItems();
    }

    // Helper method that gets us a clean list of items
    // This could actually be a web API call or we could be loading from memory or storage
    getItems() {
        this.unitsProvider.getUnits().subscribe(
            (response) => {
                this.items = response;
            } 
        );   
    }
    // Handler for presses on the cancel button
    public searchCancel(event: any) {
        // Reset this list of units to default (the search bar is cleared automatically by ionic)
        this.getItems();
        // This could be a web request to repopulate the list, or restore from storage for speed
    }

    // Handler for the search bar input. Ionic debounces this for us (~250ms min between calls)
    // Though that can be changed https://ionicframework.com/docs/v2/api/components/searchbar/Searchbar/
    // We don't actually use the contents of the event parameter in this one, but we could get the sample text from it rather than from
    public searchInput(event: any) {
        // Reset items back to all of the items
        this.getItems();

        // If the value is an empty/whitespace string don't filter the items, there would be no point
        if (this.searchText && this.searchText.trim() != '') {

            // A simple array filter to pretend we have a real search function, real world we might do this or farm the request out to an API
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
            this.items = this.items.filter(
                (item) => {
                    return (item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
                        || // Code or name. In reality we'll let the api handle this
                        (item.unit_code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
                })
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
}
