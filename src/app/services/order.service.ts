import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderDTO } from "../dtos/user/order.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private orderApi = 'http://localhost:8088/api/v1/orders';
    constructor(private http: HttpClient) {}
    createOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post<any>(this.orderApi, orderData);
    }
    getOrderById(orderId: number): Observable<any> {
        return this.http.get<any>(`${this.orderApi}/${orderId}`);
    }
    getAllOrdersForAdmin(page: number, limit: number, keyword: string): Observable<any> {
        return this.http.get<any>(`${this.orderApi}/get-orders-by-keyword?page=${page}&limit=${limit}&keyword=${keyword}`);
    }
}