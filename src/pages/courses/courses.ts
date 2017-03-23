import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CourseDetailsPage } from '../course-details/course-details';

/*
  Generated class for the Courses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-courses',
    templateUrl: 'courses.html'
})
export class CoursesPage {
    searchText: string = '';
    items: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CoursesPage');

        // Populate the list of items when this view loads
        this.getItems();
    }

    // Helper method that gets us a clean list of items
    // This could actually be a web API call or we could be loading from memory or storage
    getItems() {
        this.items = [
            {
                name: "Bachelor of Engineering in Network and Software Engineering",
                course_code: "344JA",
                id: 0
            },
            {
                name: "Bachelor of Software Engineering",
                course_code: "560AA",
                id: 1
            },
            {
                name: "Bachelor of Sports Media",
                course_code: "698AA",
                id: 2
            },
            {
                name: "Bachelor of Communication in Media and Public Affairs",
                course_code: "213JA",
                id: 3
            },
            {
                name: "Bachelor of Communication in Advertising",
                course_code: "211JA",
                id: 4
            },
            {
                name: "Bachelor of Science in Psychology",
                course_code: "780AA",
                id: 5
            }
        ]
    }

    // Handler for presses on the cancel button
    public searchCancel(event: any) {
        // Reset this list of courses to default (the search bar is cleared automatically by ionic)
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
                        (item.course_code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
                })
        }

        // TODO: Show a message if there were no items found
    }

    // Click callback when one of the items in the list is clicked on
    // We will use this to navigate to a details view, passing the item ID
    // so that we can fetch further information on that from the API
    public itemSelected(item) {
        console.log('Item selected: ' + item.id + " " + item.course_code + " " + item.name);

        this.navCtrl.push(
            CourseDetailsPage,
            // Provide the course id as a nav parameter
            { id: item.id }
        );
    }

}
