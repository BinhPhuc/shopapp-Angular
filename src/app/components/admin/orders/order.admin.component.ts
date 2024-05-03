import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderResponse } from '../../../responses/users/order.response';

@Component({
    selector: 'app-order-admin',
    templateUrl: './order.admin.component.html',
    styleUrl: './order.admin.component.scss'
})
export class OrderAdminComponent implements OnInit {
    public currentPage: number;
    private itemsPerPage: number;
    public orders: OrderResponse[];
    public totalPages: number;
    public keyword: string;
    constructor(
        private orderService: OrderService
    ) {
        this.currentPage = 0;
        this.itemsPerPage = 10;
        this.totalPages = 0;
        this.keyword = "";
    }
    ngOnInit() {
        this.loadOrders(this.keyword, this.currentPage, this.itemsPerPage);
    }
    searchProducts() {
        this.currentPage = 0;
        this.itemsPerPage = 10;
        this.loadOrders(this.keyword, this.currentPage, this.itemsPerPage);
    }
    loadOrders(keyword: string, page: number, limit: number) {
        debugger
        this.orderService.getAllOrdersForAdmin(page, limit, keyword)
            .subscribe({
                next: (response: any) => {
                    console.log(response)
                    this.orders = response.products.map((item: any) => {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            thumbnail: item.thumbnail == null ? "404_not_found.png" : item.thumbnail,
                            description: item.description,
                            category_id: item.category_id,
                            url: `http://localhost:8088/api/v1/products/images/${item.thumbnail}`
                        }
                    })
                    console.log(this.orders);
                    this.totalPages = response.totalPages;
                },
                complete() {
                    console.log("nuh uh, complete");
                },
                error(err) {
                    console.error("nuh uh", err);
                },
            })
    }
    deleteOrder(orderId: number) {

    }
    searchOrders() {
        
    }
}
