import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    public cart: Map<number, number>;
    public localStorage?: Storage;
    constructor(@Inject(DOCUMENT) private document: Document){
        this.localStorage = this.document.defaultView?.localStorage;
        const storedCart = this.localStorage?.getItem('cart');
        this.cart = new Map<number, number>(storedCart ? JSON.parse(storedCart) : []);
    }
    artToCart(productId: number, quantity: number) {
        debugger
        console.log(this.cart.get(productId))
        if(this.cart.has(productId)) {
            const currentQuantity = this.cart.get(productId);
            if(currentQuantity !== undefined) {
                this.cart.set(productId, currentQuantity + quantity);
            }
        } else {
            this.cart.set(productId, quantity);
        }
        this.saveCartToLocalStorage();
    }
    clearCart() {
        debugger
        this.cart.clear();
        this.saveCartToLocalStorage();
    }
    saveCartToLocalStorage() {
        debugger
        this.localStorage?.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
    getCart() {
        return this.cart;
    }
}