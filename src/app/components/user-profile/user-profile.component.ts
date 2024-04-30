import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UpdatedUserDto } from '../../dtos/user/updated.user.dto';
import { UserDetailResponse } from '../../responses/users/user.detail.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
    public userDetailsForm: FormGroup;

    public visiblePassword: boolean;
    public changedPassword: boolean;
    public visibleRetypePassword: boolean;
    public changedRetypePassword: boolean;
    public displayPasswordToggle: boolean;

    public userResponse: UserDetailResponse

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private tokenService: TokenService,
        private router: Router
    ) {
        this.userDetailsForm = this.formBuilder.group({
            password: ['', 
            [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            ]],
            retypePassword: ['', 
            [
            ]],
            fullName: ['', 
            [
                Validators.pattern('^[a-zA-Z ]*$')
            ]],
        }, {validator: this.checkIfMatchingPasswords("password", "retypePassword")});

        this.visiblePassword = false;
        this.changedPassword = false;
        this.visibleRetypePassword = false;
        this.changedRetypePassword = false;
        this.displayPasswordToggle = false;
    }

    ngOnInit() {
        let token: string = this.tokenService.getToken();
        this.userService.getUserDetail(token).subscribe({
            next: (response) => {
                debugger
                this.userResponse = {
                    full_name: response.full_name,
                    user_id: response.user_id,
                    phone_number: response.phone_number,
                    address: response.address
                }
                this.userDetailsForm.patchValue({
                    fullName: response.full_name
                })
            },
            complete: () => {
                debugger
                console.log('complete');
            }, 
            error: (error) => {
                debugger
                console.log(error);
            }
        })
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if(passwordInput.value === '' && passwordConfirmationInput.value === '') {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            if(passwordInput.value === '' || passwordConfirmationInput.value === '') {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors({notEquivalent: false});
            }
        }
    }

    get f() {
        return this.userDetailsForm.controls;
    }

    togglePassword() {
        this.visiblePassword = !this.visiblePassword;
        this.changedPassword = !this.changedPassword;
    }

    toggleRetypePassword() {
        this.visibleRetypePassword = !this.visibleRetypePassword;
        this.changedRetypePassword = !this.changedRetypePassword;
    }

    onSave() {
        debugger
        console.log(this.userDetailsForm.value?.password);
        console.log(this.userDetailsForm.value?.retypePassword);
        if (this.userDetailsForm.hasError('notEquivalent')) {
            alert("Password and retype password are not matching");
            return;
        }
        const updatedUserData: UpdatedUserDto = {
            'fullname': this.userDetailsForm.value?.fullName,
            'password': this.userDetailsForm.value?.password,
            'retypePassword': this.userDetailsForm.value?.retypePassword
        }
        const userId = this.userResponse.user_id;
        let token = this.tokenService.getToken();
        this.userService.updateUserDetail(updatedUserData, userId, token).subscribe({
            next: (response) => {
                debugger
                this.userService.logOut();
                this.tokenService.removeToken();
                this.router.navigate(['/login']);
            },
            complete: () => {
                debugger
                console.log('complete');
            },
            error: (error) => {
                debugger
                console.log(error);
            }
        })
    }
}
