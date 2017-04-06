import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CoursesProvider } from '../../providers/courses-provider'
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
    searchParameter: string = '';
    items: any[];

    //searcParams: URLSearchParams = new URLSearchParams(this.searchText); //Might be useful later

    constructor(public navCtrl: NavController, public navParams: NavParams, public coursesProv: CoursesProvider,
        private alertCtrl: AlertController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CoursesPage  ||  ' + this.searchText);

    }

    ionViewWillLoad() {
        if (this.navParams.get('searchParam')) {
            this.searchText = this.navParams.get('searchParam');
        } else {
            this.searchText = '';
        }
        this.searchCourseDataList();
    }

    public searchCourseDataList() {
        this.coursesProv.searchCourse(this.searchText).subscribe(
            (success) => {
                this.items = success;
            },
            (error) => {
                this.showError(error);
            }
        )
    }

    // Handler for presses on the cancel button
    public searchCancel() {
        this.searchText = '';
        // Reset this list of courses to default (the search bar is cleared automatically by ionic)
        // This could be a web request to repopulate the list, or restore from storage for speed
        this.searchCourseDataList();
        console.log('Search cancelled.');
    }

    // Handler for the search bar input. Ionic debounces this for us (~250ms min between calls)
    // Though that can be changed https://ionicframework.com/docs/v2/api/components/searchbar/Searchbar/
    // We don't actually use the contents of the event parameter in this one, but we could get the sample text from it rather than from
    public searchInput(event: any) {
        this.searchCourseDataList()
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

    public showContent() {
        return !!this.items;
    }

    public showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

}
