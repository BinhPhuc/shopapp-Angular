import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiProducts = 'http://localhost:8088/api/v1/products'
    constructor(private http: HttpClient) {}
    getProducts(page: number, limit: number): Observable<any> {
        debugger
        return this.http.get<any[]>(`${this.apiProducts}?page=${page}&limit=${limit}`);
    }
}