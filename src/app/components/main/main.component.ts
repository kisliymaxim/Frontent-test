import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../_models/product';

@Component({
    moduleId: module.id,
    selector: 'list_products',
    templateUrl: 'main.component.html',
    providers: [ProductsService]
})
export class MainComponent  {   

    products: Product[];

    constructor(private productsService: ProductsService){
        this.productsService.getProducts().subscribe(products => {
            this.products = products;//get product list from REST service
        })
    }
}
