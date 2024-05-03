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
    adminComponent: string = 'orders';
    UserDetailResponse?: UserDetailResponse | null;
    private userService = inject(UserService);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    ngOnInit() {
        this.UserDetailResponse = this.userService.getUserDetailFromLocalStorage();
    }
    logout() {
        this.userService.logOut();
        this.tokenService.removeToken();
        this.UserDetailResponse = this.userService.getUserDetailFromLocalStorage();
        this.router.navigate(['/home']);
    }
    showAdminComponent(componentName: string): void {
        debugger
        this.adminComponent = componentName;
    }
}