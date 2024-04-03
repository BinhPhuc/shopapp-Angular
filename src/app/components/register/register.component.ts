import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm!: NgForm;
    phone: string;
    password: string;
    retypePassword: string;
    fullName: string;
    address: string;   
    isAccepted: boolean;
    visiblePassword: boolean;
    changedPassword: boolean;
    visibleRetypePassword: boolean;
    changedRetypePassword: boolean;
    dateOfBirth: Date;
    displayPasswordToggle: boolean;

    constructor(private router: Router, private userService: UserService) {
        this.phone = '';
        this.password = '';
        this.retypePassword = '';
        this.fullName = '';
        this.address = '';
        this.isAccepted = false;

        this.visiblePassword = false;
        this.changedPassword = false;
        this.visibleRetypePassword = false;
        this.changedRetypePassword = false;
        this.dateOfBirth = new Date();
        this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
        this.displayPasswordToggle = false;
    }
    
    onChangePhone() {
        console.log(`Typed: ${this.phone}`);
    }
    
    togglePassword() {
        this.visiblePassword = !this.visiblePassword;
        this.changedPassword = !this.changedPassword;
    }

    toggleRetypePassword() {
        this.visibleRetypePassword = !this.visibleRetypePassword;
        this.changedRetypePassword = !this.changedRetypePassword;
    }
    
    onRegister() {
        const message = `Phone: ${this.phone}`;
        // alert(message);
        debugger
        
        const registerDTO: RegisterDTO = {
            "fullname": this.fullName,
            "phone_number": this.phone,
            "address": this.address,
            "password": this.password,
            "retype_password": this.retypePassword,
            "date_of_birth": this.dateOfBirth,
            "facebook_account_id": 0,
            "google_account_id": 0,
            "role_id": 1
        }

        this.userService.register(registerDTO).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            complete: () => {
                debugger
            },

            error: (error: any) => {
                debugger
                console.error(error);
            }      
        })
    }

    onChangePassword() {

    }
    checkPasswordMatch() {
        if(this.password != this.retypePassword) {
            this.registerForm.controls['retypePassword'].setErrors({'incorrect': true});
        } else {
            this.registerForm.controls['retypePassword'].setErrors(null);
        }
    }
    checkAge() {
        if(this.dateOfBirth.getFullYear() < (new Date()).getFullYear() - 18) {
            this.registerForm.controls['dateOfBirth'].setErrors({'invalid': true});
        } else {
            this.registerForm.controls['dateOfBirth'].setErrors(null);
        }
    }
    typingPassword() {
        this.displayPasswordToggle = !this.displayPasswordToggle;
    }
}
