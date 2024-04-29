import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../responses/users/order.response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})

export class OrderConfirmComponent implements OnInit {
    public orderResponse: OrderResponse;
    public totalPrice: number;
    public totalItem: number;
    constructor(
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.orderResponse = {
            id: 0,
            user_id: 0,
            full_name: '',
            email: '',
            phone_number: '',
            address: '',
            note: '',
            order_date: new Date(),
            total_money: 0,
            shipping_method: '',
            payment_method: '',
            order_details: [],
        };
        this.totalPrice = 0;
        this.totalItem = 0;
    }
    ngOnInit() {
        let orderId: number = 0;
        this.route.params.subscribe((params) => {
            const order_id: number = +params['orderId'];
            orderId = order_id;
        })
        this.orderService.getOrderById(orderId).subscribe({
            next: (response) => {
                debugger
                this.orderResponse.id = response.id;
                this.orderResponse.user_id = response.user_id;
                this.orderResponse.full_name = response.full_name;
                this.orderResponse.email = response.email;
                this.orderResponse.phone_number = response.phone_number;
                this.orderResponse.address = response.address;
                this.orderResponse.note = response.note;
                
                const orderDate = new Date(response.order_date);
                const day = orderDate.getDate(); // Ngày
                const month = orderDate.getMonth() + 1; // Tháng (cộng 1 vì tháng bắt đầu từ 0)
                const year = orderDate.getFullYear(); // Năm

                this.orderResponse.order_date = new Date(year, month, day);

                this.orderResponse.total_money = response.total_money;
                this.orderResponse.shipping_method = response.shipping_method;
                this.orderResponse.payment_method = response.payment_method;
                this.orderResponse.order_details = response.order_details.map((item: any) => {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        thumbnail: `http://localhost:8088/api/v1/products/images/${item.thumbnail}`,
                        order_id: item.order_id,
                        product_id: item.product_id,
                        product_name: item.product_name,
                        total_price: Math.round(item.price * item.quantity)
                    };
                })
                this.getToalPrice();
                this.totalItem = this.orderResponse.order_details.length;
                console.log(this.orderResponse);
            },
            complete() {
                debugger
                console.log('nuh uh complete');
            },
            error: (error) => {
                debugger
                console.log(error);
            }
        });
    }
    getToalPrice() {
        this.totalPrice = this.orderResponse.order_details.reduce((total, item) => total + item.total_price, 0);
        return this.totalPrice;
    }
    goShopping() {
        alert('Thank you for your order!');
        this.router.navigate(['/home']);
    }
}
