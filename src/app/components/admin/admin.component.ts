import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserDetailResponse } from '../../responses/users/user.detail.response'
import { TokenService } from '../../services/token.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: [
        './admin.component.scss',
    ],
})
export class AdminComponent implements OnInit {
    //adminComponent: string = 'orders';
    UserDetailResponse?: UserDetailResponse | null;
    private userService = inject(UserService);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    ngOnInit() {
        this.UserDetailResponse = this.userService.getUserDetailFromLocalStorage();
        // Default router
        debugger
        if (this.router.url === '/admin') {
            this.router.navigate(['/admin/orders']);
        }
    }
    logout() {
        this.userService.logOut();
        this.tokenService.removeToken();
        this.UserDetailResponse = this.userService.getUserDetailFromLocalStorage();
        this.router.navigate(['/home']);
    }
    showAdminComponent(componentName: string): void {
        debugger
        if (componentName === 'orders') {
            this.router.navigate(['/admin/orders']);
        } else if (componentName === 'categories') {
            this.router.navigate(['/admin/categories']);
        } else if (componentName === 'products') {
            this.router.navigate(['/admin/products']);
        } else if (componentName === 'users') {
            this.router.navigate(['/admin/users']);
        }
    }
}