import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    public currentPage: number;
    private itemsPerPage: number;
    public products: Product[];
    private pages: number[]
    public totalPages: number;
    private visiblePages: number[];
    constructor(private productService: ProductService){
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.products = [];
        this.pages = [];
        this.totalPages = 0;
        this.visiblePages = [];
    }
    ngOnInit() {
        debugger
        console.log("home component initialized");
        this.loadProducts(this.currentPage, this.itemsPerPage);
    }
    loadProducts (page: number, limit: number) {
        debugger
        this.productService.getProducts(page, limit)
        .subscribe({
            next: (response: any) => {
                debugger
                response.products.forEach((product: Product) => {
                    product.url = `http://localhost:8088/api/v1/products/images/${product.thumbnail}`;
                });
                this.products = response.products; 
                this.totalPages = response.totalPages;
            },
            complete() {
                debugger
                console.log("nuh uh, complete");
            },
            error(err) {
                debugger
                console.error("nuh uh", err);
            },
        })
    }
    nextPage() {
        if(this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadProducts(this.currentPage, this.itemsPerPage);
        }
    }
    prevPage() {
        if(this.currentPage > 1) {
            this.currentPage--;
            this.loadProducts(this.currentPage, this.itemsPerPage);
        }
    }
    pageChanged(event: any) {
        this.currentPage = event;
    }
}
