import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    templateUrl: './confirm-profile-changes.component.html',
    styleUrls: ['./confirm-profile-changes.component.css']
})

export class ConfirmProfileChangesComponent {
    public confirmProfileForm: FormGroup;
    public clicked: boolean = false;
    public errMsg: string;
    public httpErr: string;
    public formErrors = {
        'password': ''
    };
    public validationMessages = {
        'password': {
            'required': 'Password is required.'
        }
    };

    constructor(private fb: FormBuilder,
                private router: Router,
                private userService: UserService) {
        this.createForm();
        this.confirmProfileForm.valueChanges
            .subscribe(data => this.onValueChanges(data));
    }

    public createForm(): void {
        this.confirmProfileForm = this.fb.group({
            'password': ['', Validators.required]
        });
    }

    public onValueChanges(data: any) {
        if (!this.confirmProfileForm) { return; }
        const form = this.confirmProfileForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    public onSubmit(obj: any): void {
        let password: string = obj.password;
        if (this.formErrors.password !== '' || password === '') {
            this.errMsg = 'Insert a valid password.';
            return;
        } else {
            this.errMsg = '';
            let username: string = localStorage.getItem('username');
            let newUsername: string = this.userService.getNewUsername();
            this.userService.updateProfile(newUsername, username, password).then(res => {
                if (!res) {
                    return this.errMsg = this.userService.errMsg;
                } else {
                    this.errMsg = '';
                    localStorage.removeItem('username')
                    localStorage.setItem('username', newUsername);
                    this.router.navigate(["/home"]);
                }
            },
            err =>  this.httpErr = err);
        }
    }
}