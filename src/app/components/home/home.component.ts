import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Categorty } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    public currentPage: number;
    private itemsPerPage: number;
    public products: Product[];
    public totalPages: number;
    public keyword: string;
    public categories: Categorty[];
    public selectedCategoryId: number;
    private categoryMap: Map<number, string> = new Map();
    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router
    ){
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.products = [];
        this.totalPages = 0;
        this.keyword = "";
        this.categories = [];
        this.selectedCategoryId = 0;
    }
    ngOnInit() {
        // debugger
        console.log("home component initialized");
        this.categoryService.getCategories().subscribe({
            next: (response: any) => {
                this.categories = response.map((item: any) => {
                    this.categoryMap.set(item.id, item.name);
                    return {
                        id: item.id,
                        name: item.name
                    }
                });
            },
            complete() {
                console.log("nuh uh, complete");
            },
            error(err) {
                console.error("nuh uh", err);
            },
        })
        this.loadProducts(this.keyword, this.selectedCategoryId ,this.currentPage, this.itemsPerPage);
    }
    searchProducts() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.loadProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }
    loadProducts (keyword: string, categoryId: number,page: number, limit: number) {
        debugger
        this.productService.getProducts(keyword, categoryId, page, limit)
        .subscribe({
            next: (response: any) => {
                console.log(response)
                this.products = response.products.map((item: any) => {
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
                console.log(this.products);
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
    pageChanged(event: any) {
        this.currentPage = event;
        this.loadProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }
    productClick(productName: string, productId: number, productCategoryId: number) {
        const categoryName = this.categoryMap.get(productCategoryId);
        this.router.navigate(['/product', categoryName, productId, productName]);
    }
}
