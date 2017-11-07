import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from './user.service';

@Component ({
    templateUrl: './login.component.html',
    styleUrls: ['./form.css']
})

export class LoginComponent {
    public authForm: FormGroup;

    constructor(private router: Router,
                 private formBuilder: FormBuilder,
                 private userService: UserService) {
        this.authForm = formBuilder.group({
            username:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[\w]+$/)])],
            password: ['', Validators.required]
        })
        this.authForm.valueChanges
            .subscribe(data => this.onValueChanges(data));
    }

    public errMsg: string;
    public error: boolean;
    public httpErr: string;
    public formErrors = {
        'username': '',
        'password': ''
    };
    public validationMessages = {
        'username': {
            'required': 'Username is required.',
            'minlength': 'Username doesn\'t exist.',
            'maxlength': 'Username doesn\'t exist.',
            'pattern': 'Username doesn\'t exist.'
        },
        'password': {
            'required': 'Password is required.',
        }
    };

    public onValueChanges(data: any) {
        if (!this.authForm) { return; }
        const form = this.authForm;
        this.error = false;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                this.error = true;
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    public onSubmit(obj: any): void {
        const username: string = obj.username;
        const password: string = obj.password;
        if (this.userService.isLoggedIn()) {
            this.errMsg = 'You are already logged in.';
            return;
        }
        if (this.error) {
            this.errMsg = 'Please correct reported errors before submitting.';
            return;
        } else {
            this.errMsg = '';
            localStorage.setItem('username', username);
            this.userService.login(username, password)
                .then((result) => {
                if (result) {
                    this.errMsg = '';
                    this.router.navigate(['/profile']);
                } else {
                    this.errMsg = this.userService.errMsg;
                }
            },
                      (err) => {
                this.httpErr = err;
            });
        }
    }
}
