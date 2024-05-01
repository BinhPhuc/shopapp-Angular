import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../responses/users/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailResponse } from '../../responses/users/user.detail.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    public loginForm: FormGroup;
    public phone: string;
    public password: string;
    public visiblePassword: boolean;
    public roles: Role[];
    public userDetail: UserDetailResponse;
    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private roleService: RoleService,
        private formBuilder: FormBuilder
    ) {
        this.visiblePassword = false;
        this.roles = [];

        this.loginForm = this.formBuilder.group({
            phone: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['true'],
            selectedRole: ['', Validators.required]
        })
    }

    ngOnInit() {
        // debugger
        this.roleService.getRoles()
        .subscribe({
            next: (response: any) => {
                this.roles = response.map((role: any) => {
                    return {
                        id: role.id,
                        name: role.name
                    }
                });
                this.loginForm.get('selectedRole')?.setValue(this.roles[0]);
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
        debugger
        const loginData: LoginDTO = {
            'phone_number': this.loginForm.get('phone')?.value,
            'password': this.loginForm.get('password')?.value,
            'role_id': this.loginForm.get('selectedRole')?.value.id
        };
        this.userService.login(loginData)
        .subscribe({
            next: (respone: LoginResponse) => {
                debugger
                const token = respone.token;
                this.tokenService.setToken(token);
                if(this.loginForm.get('rememberMe')?.value) {
                    this.userService.getUserDetail(token).subscribe({
                        next: (userResponse: any) => {
                            debugger
                            console.log(userResponse)
                            this.userDetail = {
                                user_id: userResponse.user_id,
                                full_name: userResponse.full_name,
                                phone_number: userResponse.phone_number,
                                address: userResponse.address,
                                role_id: userResponse.role_id
                            };
                            this.userService.setUser(this.userDetail);
                            if(userResponse.role_id === 1) {
                                console.log('User');
                                this.router.navigate(['/home']);
                            } else {
                                console.log('Admin');
                                this.router.navigate(['/admin'])
                            }
                        }, 
                        complete() {
                            debugger
                            console.log('Get user detail completed')
                        },
                        error() {
                            debugger
                            console.log('Get user detail error')
                        }
                    })
                }
            },
            complete() {
                debugger
                console.log('Login completed')
            },
            error(err: any) {
                debugger
                alert('username or password is incorrect');
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
