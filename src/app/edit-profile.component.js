"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var user_service_1 = require("./user.service");
var EditProfileComponent = (function () {
    function EditProfileComponent(fb, router, userService) {
        var _this = this;
        this.fb = fb;
        this.router = router;
        this.userService = userService;
        this.formErrors = {
            'username': ''
        };
        this.validationMessages = {
            'username': {
                'required': 'Username is required.',
                'minlength': 'Username must be at least 3 characters long.',
                'maxlength': 'Username cannot be more than 10 characters',
                'pattern': 'Username can contain only letters, numbers or underscores'
            }
        };
        this.createForm();
        this.editProfileForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanges(data); });
    }
    EditProfileComponent.prototype.createForm = function () {
        this.editProfileForm = this.fb.group({
            'username': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(10), forms_1.Validators.pattern(/^[\w]+$/)])]
        });
    };
    EditProfileComponent.prototype.onValueChanges = function (data) {
        if (!this.editProfileForm) {
            return;
        }
        var form = this.editProfileForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    EditProfileComponent.prototype.confirm = function () {
        this.router.navigate(["/delete-profile"]);
    };
    EditProfileComponent.prototype.onSubmit = function (obj) {
        var _this = this;
        var username = obj.username;
        if (this.formErrors.username !== '' || username === '') {
            this.errMsg = 'Insert a valid username.';
            return;
        }
        else {
            this.errMsg = '';
            this.userService.setNewUsername(username)
                .then(function (res) {
                if (!res) {
                    return _this.errMsg = _this.userService.errMsg;
                }
                else {
                    _this.router.navigate(["/confirm-edits"]);
                }
            }, function (err) { return _this.httpErr = err; });
        }
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    core_1.Component({
        templateUrl: './edit-profile.component.html',
        styleUrls: ['./edit-profile.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        user_service_1.UserService])
], EditProfileComponent);
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map