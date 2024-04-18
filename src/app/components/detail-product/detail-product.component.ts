import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/product.image';
import { CartService } from '../../services/cart.service';
import { rename } from 'node:fs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
    public product: Product;
    public productImages: ProductImage[];
    public productId: number;
    public currentImageIndex: number;
    public numberOfProduct: number;
    public totalImage: number;
    constructor(
        private productService: ProductService,
        private cartService: CartService
    ) {
        this.productImages = [];
        this.productId = 0;
        this.currentImageIndex = 0;
        this.numberOfProduct = 1;
        this.totalImage = 0;
    }
    ngOnInit() {
        const product_id = 8;
        this.productId = product_id;
        this.productService.getProductById(product_id).subscribe({
            next: (response: any) => {
                debugger;
                if(response) {
                    this.product = {
                        id: response.id || 0,
                        name: response.name || "",
                        price: response.price,
                        thumbnail: response.thumbnail,
                        description: response.description,
                        category_id: response.category_id,
                        quantity: 0,
                        url: response.url || "",
                    };
                }
                console.log(this.product);
            },
            complete() {
                console.log(`nuh uh complete`);
            },
            error(err) {
                console.log(`nuh uh error: ${err}`);
            },
        })
        this.productService.getImagesByProductId(product_id).subscribe({
            next: (response: any) => {
                response.forEach((image: ProductImage) => {
                    if(!image.image_url.startsWith('http://localhost:8088/api/v1/products/images/')) {
                        image.image_url = `http://localhost:8088/api/v1/products/images/${image.image_url}`;
                    }
                });
                this.productImages = response;
                this.totalImage = response.length;
                this.showImage(0);
            },
            complete() {
                console.log(`nuh uh complete`);
            },
            error(err) {
                console.log(`nuh uh error: ${err}`);
            },
        })
    }
    increasing() {
        this.numberOfProduct++;
    }
    decreasing() {
        this.numberOfProduct--;
        if(this.numberOfProduct < 1) {
            this.numberOfProduct = 1;
        }
    }
    preventNonNumber(event: any) {
        if(event.keyCode < 48 || event.keyCode > 57) {
            event.preventDefault();
        }
    }
    showImage(index: number) {
        index %= this.totalImage;
        if(index < 0) {
            index = (index + this.totalImage) % this.totalImage;
        }
        this.currentImageIndex = index;
    }
    thumbnailClicked(index: number) {
        // debugger
        this.showImage(index);
        this.currentImageIndex = index;
    }
    prevImage() {
        // debugger
        this.showImage(this.currentImageIndex - 1);
    }
    nextImage() {
        // debugger
        this.showImage(this.currentImageIndex + 1);
        console.log("next")
    }
    artToCart() {
        debugger
        this.cartService.artToCart(this.productId, this.numberOfProduct);
        console.log("add to cart");
    }
    buyNow() {

    }
}
