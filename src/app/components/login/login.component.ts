import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../responses/users/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { debug } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    @ViewChild('loginForm') loginForm: any;
    phone: string;
    password: string;
    visiblePassword: boolean;
    rememberMe: boolean;
    roles: Role[];
    selectedRole: Role | undefined;
    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private roleService: RoleService
    ) {
        this.phone = '0866194010';
        this.password = 'binh2006';
        this.visiblePassword = false;
        this.rememberMe = true;
        this.roles = [];
    }

    ngOnInit() {
        // debugger
        this.roleService.getRoles()
        .subscribe({
            next: (roles: Role[]) => {
                // debugger
                this.roles = roles;
                this.selectedRole = roles.length > 0 ? roles[0] : undefined;
            },
            complete() {
                console.log('Get roles completed')
            },
            error(err: any) {
                console.error('Get roles error', err)
            },
        })
    }
    
    onLogin() {
        const loginData: LoginDTO = {
            'phone_number': this.phone,
            'password': this.password,
            'role_id': this.selectedRole?.id ?? 0
        };
        this.userService.login(loginData)
        .subscribe({
            next: (respone: LoginResponse) => {
                debugger
                const token = respone.token;
                if(this.rememberMe) {
                    this.tokenService.setToken(token);
                }
                console.log(respone);
            },
            complete() {
                debugger
                console.log('Login completed')
            },
            error(err: any) {
                debugger
                console.error('Login error', err)
            },
        })
    }

    onChangePhone() {
        console.log(this.phone);
    }
    onChangePasswordVisibility() {
        this.visiblePassword = !this.visiblePassword;
    }
}
