import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    private apiCategories = 'http://localhost:8088/api/v1/categories'
    constructor(private http: HttpClient) {}
    getCategories(): Observable<any> {
        return this.http.get<any[]>(`${this.apiCategories}`);
    }
    getCategoryById(categoryId: number): Observable<any >{
        return this.http.get<any[]>(`${this.apiCategories}/${categoryId}`);
    }
}