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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var poll_service_1 = require("./poll.service");
var AddPollComponent = (function () {
    function AddPollComponent(pollService, router, fb) {
        var _this = this;
        this.pollService = pollService;
        this.router = router;
        this.fb = fb;
        this.hasChanged = false;
        this.extraOptions = [
            { name: '', votes: 0 },
            { name: '', votes: 0 }
        ];
        this.formErrors = {
            'title': '',
            'options': ''
        };
        this.validationMessages = {
            'title': {
                'required': 'Title is required.',
                'pattern': 'Title can contain only letters, numbers or underscores'
            },
            'options': {
                'pattern': 'Options can contain only letters, numbers or underscores'
            }
        };
        this.createForm();
        this.addPollForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanges(data); });
    }
    AddPollComponent.prototype.createForm = function () {
        this.addPollForm = this.fb.group({
            title: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^[\w]+$/)])],
            options: this.fb.array([])
        });
    };
    AddPollComponent.prototype.setOptions = function (options) {
        var optionFGs = options.map(function (option) { return new forms_1.FormControl(option.name, forms_1.Validators.pattern(/^[\w]+$/)); });
        var optionFormArray = this.fb.array(optionFGs);
        console.log(optionFGs);
        this.addPollForm.setControl('options', optionFormArray);
    };
    Object.defineProperty(AddPollComponent.prototype, "options", {
        get: function () { return this.addPollForm.get('options'); },
        enumerable: true,
        configurable: true
    });
    AddPollComponent.prototype.addOption = function (e) {
        e.preventDefault();
        this.options.push(new forms_1.FormControl('', forms_1.Validators.pattern(/^[\w]+$/)));
    };
    AddPollComponent.prototype.removeOption = function (e) {
        e.preventDefault();
        if (this.options.length > 2) {
            this.options.removeAt(this.options.length - 1);
        }
        else {
            return;
        }
    };
    AddPollComponent.prototype.onValueChanges = function (data) {
        this.incomplete = '';
        if (!this.addPollForm) {
            return;
        }
        var form = this.addPollForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                if (field === 'options') {
                    for (var i = 0; i < control.value.length; i++) {
                        for (var key in control.get(i + '').errors) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
                else {
                    for (var key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    };
    AddPollComponent.prototype.getCount = function () {
        var _this = this;
        this.pollService.getCount()
            .then(function (countObj) { return _this.countObj = countObj; }, function (err) { return _this.errMsg = err; });
    };
    AddPollComponent.prototype.ngOnInit = function () {
        this.errMsg = '';
        this.getCount();
        this.username = localStorage.getItem('username');
        this.setOptions(this.extraOptions);
    };
    AddPollComponent.prototype.reset = function (e) {
        e.preventDefault();
        this.addPollForm.reset({
            title: ''
        });
        this.setOptions(this.extraOptions);
    };
    AddPollComponent.prototype.addPoll = function (formObj) {
        var _this = this;
        if (!formObj.title) {
            this.incomplete = 'You must insert a title';
            return;
        }
        var count = this.countObj.count++;
        var options = this.pollService.cleanNewPollOptions(formObj.options);
        if (!options) {
            this.incomplete = this.pollService.errMsg;
            return;
        }
        var newPoll = {
            username: this.username,
            title: formObj.title,
            id: count,
            options: options
        };
        this.pollService.create(newPoll).then(function () {
            _this.pollService.updateCount(_this.countObj)
                .then(function () { return _this.router.navigate(['/home']); }, function (err) { return _this.errMsg = err; });
        }, function (err) {
            _this.errMsg = err;
        });
    };
    return AddPollComponent;
}());
AddPollComponent = __decorate([
    core_1.Component({
        templateUrl: './add-poll.component.html',
        styleUrls: ['./add-poll.component.css']
    }),
    __metadata("design:paramtypes", [poll_service_1.PollService,
        router_1.Router,
        forms_1.FormBuilder])
], AddPollComponent);
exports.AddPollComponent = AddPollComponent;
//# sourceMappingURL=add-poll.component.js.map