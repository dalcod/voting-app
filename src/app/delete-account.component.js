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
var poll_service_1 = require("./poll.service");
var DeleteAccountComponent = (function () {
    function DeleteAccountComponent(fb, router, pollService) {
        var _this = this;
        this.fb = fb;
        this.router = router;
        this.pollService = pollService;
        this.clicked = false;
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.'
            }
        };
        this.createForm();
        this.editProfileForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanges(data); });
    }
    DeleteAccountComponent.prototype.createForm = function () {
        this.editProfileForm = this.fb.group({
            password: ['', forms_1.Validators.required]
        });
    };
    DeleteAccountComponent.prototype.onValueChanges = function (data) {
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
    DeleteAccountComponent.prototype.onSubmit = function (obj) {
        if (this.formErrors.password !== '') {
            this.errMsg = 'Please correct reported errors before submitting.';
            return;
        }
        else {
            this.errMsg = '';
            var username = localStorage.getItem('username');
            var password = obj.password;
        }
    };
    return DeleteAccountComponent;
}());
DeleteAccountComponent = __decorate([
    core_1.Component({
        templateUrl: './edit-profile.component.html',
        styleUrls: ['./edit-profile.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        poll_service_1.PollService])
], DeleteAccountComponent);
exports.DeleteAccountComponent = DeleteAccountComponent;
//# sourceMappingURL=delete-account.component.js.map