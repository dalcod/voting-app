import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent {
    public editProfileForm: FormGroup;
    public errMsg: string;
    public httpErr: string;
    public formErrors = {
        'username': ''
    };
    public validationMessages = {
        'username': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 3 characters long.',
            'maxlength': 'Username cannot be more than 10 characters',
            'pattern': 'Username can contain only letters, numbers or underscores'
        }
    };

    constructor(private fb: FormBuilder,
                private router: Router,
               private userService: UserService) {
        this.createForm();
        this.editProfileForm.valueChanges
            .subscribe(data => this.onValueChanges(data));
    }

    public createForm(): void {
        this.editProfileForm = this.fb.group({
            'username':  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[\w]+$/)])]
        });
    }

    public onValueChanges(data: any) {
        if (!this.editProfileForm) { return; }
        const form = this.editProfileForm;
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

    public confirm(): void {
        this.router.navigate(["/delete-profile"]);
    }
    
    public onSubmit(obj: any): void {
        let username: string = obj.username;
        if (this.formErrors.username !== '' || username === '') {
            this.errMsg = 'Insert a valid username.';
            return;
        } else {
            this.errMsg = '';
            this.userService.setNewUsername(username)
                .then(res => {
                    if (!res) {
                        return this.errMsg = this.userService.errMsg;
                    } else {
                        this.router.navigate(["/confirm-edits"]);
                    }
                },
                err => this.httpErr = err);
        }
    }
}