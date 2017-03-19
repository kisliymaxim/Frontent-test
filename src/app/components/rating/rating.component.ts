import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'app-rating',
    templateUrl: 'rating.component.html',
    styleUrls: ['rating.component.css']
})
export class RatingComponent {
    @Input() rating: number;
    @Input() review_id: number;
    @Input() product_id: number;
    @Input() isActive: boolean;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    input_name:string;
    ngOnInit() {
        if(typeof this.review_id !== 'undefined')
            this.input_name = this.review_id + '_rating'; //generate rating from list
        else
            this.input_name = 'new_rating'; //generate new rating form
    }
    onClick(rating: number): void {
        //set rating
        if(this.isActive){
            this.rating = rating;
            this.ratingClick.emit({
                rating: rating
            });
        }
    }
}