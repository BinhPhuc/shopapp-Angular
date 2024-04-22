import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderDTO } from "../dtos/user/order.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private orderApi = 'http://localhost:8088/api/v1/orders';
    constructor(private htpp: HttpClient) {}
    public createOrder(orderData: OrderDTO): Observable<any> {
        return this.htpp.post(this.orderApi, orderData);
    }
    public getOrderById(orderId: number): Observable<any> {
        return this.htpp.get<any>(`${this.orderApi}/${orderId}`);
    }
}