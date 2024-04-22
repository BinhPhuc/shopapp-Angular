import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart.item';
import { OrderDTO } from '../../dtos/user/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
    public cartItems: CartItem[];
    public totalItems: number;
    public totalPrice: number;
    public orderData: OrderDTO = {
        user_id: 8,
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        note: '',
        total_money: 0,
        shipping_method: 'express',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: 'cod',
        cart_items: []
    };
    public orderForm: FormGroup;
    constructor(
        private cartService: CartService,
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private orderService: OrderService
    ) {
        this.cartItems = [];
        this.orderForm = this.formBuilder.group({
            name: ['pham phuc binh', [Validators.required]],
            email: ['phamphucbinh@gmail.com', [Validators.required, Validators.email]],
            phone: ['0866194010', [ Validators.required ,Validators.minLength(10)]],
            address: ['ha noi', [Validators.required]],
            note: ['dễ vỡ, cẩn thận khi vận chuyển'],
            shipping_method: ['express'],
            payment_method: ['cod']
        });
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
    onSubmit() {
        debugger
        if(this.orderForm.valid) {
            this.orderData = {
                user_id: 8,
                full_name: this.orderForm.get('name')?.value,
                email: this.orderForm.get('email')?.value,
                phone_number: this.orderForm.get('phone')?.value,
                address: this.orderForm.get('address')?.value,
                note: this.orderForm.get('note')?.value,
                total_money: this.totalPrice,
                shipping_method: this.orderForm.get('shipping_method')?.value,
                shipping_address: this.orderForm.get('address')?.value,
                shipping_date: new Date(),
                payment_method: this.orderForm.get('payment_method')?.value,
                cart_items: this.cartItems.map((item) => {
                    return {
                        product_id: item.id,
                        quantity: item.quantity
                    }
                })
            };
            this.orderService.createOrder(this.orderData).subscribe({
                next: (response: any) => {
                    debugger
                    console.log("create order success");
                },
                complete() {
                    debugger
                    console.log('nuh uh complete');
                },
                error: () => {
                    console.log('Error creating order');
                }
            });
        } else {
            alert('Please fill in all required fields');
        }
    }
}
