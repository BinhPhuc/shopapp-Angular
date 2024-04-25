import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    public visiblePassword: boolean;
    public changedPassword: boolean;
    public visibleRetypePassword: boolean;
    public changedRetypePassword: boolean;
    public displayPasswordToggle: boolean;
    public submitted: boolean;

    registerForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        this.visiblePassword = false;
        this.changedPassword = false;
        this.visibleRetypePassword = false;
        this.changedRetypePassword = false;
        this.displayPasswordToggle = false;
        this.submitted = false;

        this.registerForm = this.formBuilder.group({
            phone: ['', 
            [
                Validators.required, 
                Validators.pattern('^[0-9]*$'), 
                Validators.minLength(10), 
                Validators.maxLength(10)
            ]],
            password: ['', 
            [
                Validators.required, 
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25)
            ]],
            retypePassword: ['', 
            [
                Validators.required
            ]],
            fullName: ['', 
            [
                Validators.required,
                Validators.pattern('^[a-zA-Z ]*$')
            ]],
            dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
            address: [''],
            isAccepted: [false, Validators.requiredTrue]
        }, {validator: this.checkIfMatchingPasswords("password", "retypePassword")});

    }

    dateOfBirthValidator(control: FormControl): boolean | null {
        const dobString: string = control.value;
        const dob: Date = new Date(dobString);
        const today: Date = new Date();
        const age: number = today.getFullYear() - dob.getFullYear();
        return age >= 18;
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    get f() {
        return this.registerForm.controls;
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
        debugger
        this.submitted = true;
        if(this.registerForm.invalid) {
            return;
        }
        const registerDTO: RegisterDTO = {
            "fullname": this.registerForm.get('fullName')?.value,
            "phone_number": this.registerForm.get('phone')?.value,
            "address": this.registerForm.get('address')?.value,
            "password": this.registerForm.get('password')?.value,
            "retype_password": this.registerForm.get('retypePassword')?.value,
            "date_of_birth": this.registerForm.get('dateOfBirth')?.value,
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

    typingPassword() {
        this.displayPasswordToggle = !this.displayPasswordToggle;
    }
}
