import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart.item';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit {
    public cartItems: CartItem[];
    public totalItems: number;
    public totalPrice: number;
    constructor(
        private cartService: CartService,
        private productService: ProductService
    ) {
        this.cartItems = [];
    }
    ngOnInit() {
        const cart = this.cartService.getCart();
        const productIds = Array.from(cart.keys());
        this.productService.getAllProductsByIds(productIds).subscribe({
            next: (response: any) => {
                // debugger
                this.cartItems = response.map((item: any) => {
                    return {
                        id: item.id || 0,
                        name: item.name || '',
                        quantity: cart.get(item.id) || 0, 
                        price: item.price || 0,
                        thumbnail: `http://localhost:8088/api/v1/products/images/${item.thumbnail}`,
                        total: Math.round((item.price || 0) * (cart.get(item.id) || 0))
                    };
                });
                this.totalItems = this.cartItems.length;
                this.totalPrice = this.getTotalPrice();
            },
            complete() {
                // debugger
                console.log('nuh uh complete');
            },
            error() {
                // debugger
                console.log('nuh uh error');
            },
        });
    }
    getTotalPrice(): number {
        return this.cartItems.reduce((acc, item) => acc + item.total, 0);
    }
}
