import { Component, Input } from '@angular/core';

/*
  Generated class for the Comments component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'comments',
    templateUrl: 'comments.html'
})
export class CommentsComponent {

    @Input('entity-type') entity_type: string;  // The type of entity (e.g. course, unit) used to select which provider to use
    @Input('entity-id') entity_id: string;    // The ID of the entity (used when getting stuff from the provider)

    comments: any[];

    constructor() {
        console.log('Hello Comments Component');
    }

}
