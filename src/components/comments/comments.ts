import { Component, Input, SimpleChanges } from '@angular/core';
import { UnitsProvider } from '../../providers/units-provider';

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

    error: any;
    comments: any[];

    constructor(private unitsProvider: UnitsProvider) {
        console.log('Hello Comments Component');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        // Changes contains the old and the new values of both inputs, we don't actually care though
        if (this.entity_type == 'unit' && this.entity_id) {
            console.log("getting comments!");
            this.unitsProvider.getCommentsForUnit(this.entity_id).subscribe(
                data => {
                    this.comments = data;
                    console.log("got comments!");
                    console.log(data);
                },
                error => {
                    console.log(error);
                    this.error = error;
                }
            )
        }
        else if (!this.entity_type || !this.entity_id) {
            // no op
        }
        else {
            throw new Error('ERROR: unsupported entity type "' + this.entity_type + '" given to comments component');
        }
    }

    public showContent() {
        return !!this.comments;
    }

    public showEmpty() {
        return this.comments === [];
    }
}
