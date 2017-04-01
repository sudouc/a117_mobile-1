import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchProvider } from '../../providers/search-provider';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchString: string = '';
  placeholderItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getPlaceholderItems();
  }

  getPlaceholderItems(){
      this.placeholderItems = [
          {id:1, name: "ESTEM"},
          {id:2,name:"health"},
          {id:3,name:"whatever"}];
  }

  /*Search*/
  public searchInput(event: any){
    this.getPlaceholderItems();

    if (this.searchString && this.searchString.trim() != ''){

        this.placeholderItems = this.placeholderItems.filter(
            (item) => {
                return (item.name.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1);
            })
    }
  }

  public searchCancel(){
      this.getPlaceholderItems();
  }
}
