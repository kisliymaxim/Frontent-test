import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Product } from '../../_models/product';

@Injectable()
export class ProductsService {
    constructor(private http: Http){ }

    getProducts(){
        //get list of products
        let params = new URLSearchParams();
        params.set('format', 'json');
        return this.http.get('http://smktesting.herokuapp.com/api/products', { search: params })
            .map(res => res.json());
    }
    
    getProduct(id: number){
        // get one product
        let params = new URLSearchParams();
        params.set('format', 'json');
        return this.http.get('http://smktesting.herokuapp.com/api/products', { search: params })
            .map((response) => {
                let products = response.json();
                let product : Product = products.filter((item : Product) => item.id === id);
                return product;
            });
    }

    getReviews(id: number){
        //get reviews for product with id
        return this.http.get('http://smktesting.herokuapp.com/api/reviews/'+id)
            .map(res => res.json());
    }
    
    addReview(rate: number, text: number , id: number){
        //ser review to product with id
        let body = JSON.stringify({ rate: rate, text: text });
        return this.http.post('http://smktesting.herokuapp.com/api/reviews/'+id, body, this.jwt())
            .map(res => res.json());
    }
    
    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token,'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}