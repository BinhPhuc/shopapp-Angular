import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetailResponse } from '../../responses/users/user.detail.response';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isOnHome = false;
    public isOnNotification = false;
    public isOnOrder = false;
    public isOnLogin = false;
    public userDetail: UserDetailResponse | null;
    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.updateActiveState();
            }
        });
    };
    ngOnInit() {
        this.userDetail = this.userService.getUserDetailFromLocalStorage();
    }
    updateActiveState() {
        const currentUrl = this.router.url;
        this.isOnHome = currentUrl === '/home';
        this.isOnNotification = currentUrl === '/notification';
        this.isOnOrder = currentUrl === '/order';
        this.isOnLogin = currentUrl === '/login';
    }
    handleOption(option: number) {
        switch (option) {
            case 1:
                console.log('case 1')
                break;
            case 2:
                console.log('case 2')
                break;
            case 3:
                this.userService.logOut();
                this.tokenService.removeToken();
                this.userDetail = this.userService.getUserDetailFromLocalStorage();
                console.log("log out successfull")
                break;
            default:
                console.log("default case");
        }
    }
}
