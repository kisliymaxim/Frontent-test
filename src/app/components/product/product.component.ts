import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { RatingComponent } from '../../components/rating/rating.component';
import { Product } from '../../_models/product';
import { Review } from '../../_models/review';

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css'],
    providers: [ProductsService, RatingComponent]
})
export class ProductComponent implements OnInit, OnDestroy {

    product_id: number;
    product: Product;
    reviews: Review[];
    private sub: any;
    loading = false;
    reviewForm : FormGroup;
    @ViewChild(RatingComponent) RatingComponent : RatingComponent;

    constructor(private route: ActivatedRoute, private productsService: ProductsService, fb: FormBuilder) {
        this.reviewForm = fb.group({
            'review' : [null, Validators.required],
            'rate' : [null, Validators.required],
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.product_id = +params['id']; // (+) converts string 'id' to a number
        });
        this.productsService.getProduct(this.product_id).subscribe(product=> {
            this.product = product[0];  // get info product      
        });
        this.productsService.getReviews(this.product_id).subscribe(reviews => {
            this.reviews = reviews.slice().reverse(); // get review for product and order(from new to old)
        });
    }   

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ratingComponetClick(clickObj: any): void {
        this.reviewForm.controls['rate'].setValue(clickObj.rating); // set rate value
    }

    add_review(value: any){
        this.loading = true;
        this.productsService.addReview(value.rate,  value.review, this.product_id).subscribe(response=> {
            this.productsService.getReviews(this.product_id).subscribe(reviews => {
                this.reviews = reviews.slice().reverse(); // get review for product and order(from new to old)
            });
        });
        this.reviewForm.reset(); // reset review form
        this.RatingComponent.rating = null; // reset rate in child component
        this.loading = false;
    }
}