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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var chart_1 = require("./chart");
var poll_service_1 = require("./poll.service");
var MyPollsDetailComponent = (function () {
    function MyPollsDetailComponent(pollService, route, location, router) {
        this.pollService = pollService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.options = [];
        this.hide = true;
        this.errMsg = '';
    }
    MyPollsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pieChartOptions = chart_1.CHART;
        this.route.params
            .switchMap(function (params) { return _this.pollService.getMyPoll(+params['id']).then(function (res) { return res; }, function (err) { return _this.errMsg = err; }); })
            .subscribe(function (selectedPoll) {
            _this.poll = selectedPoll;
            if (_this.poll) {
                _this.options = _this.pollService.getPollOptions(selectedPoll);
                _this.pollService.updateChart(_this.options);
            }
        });
    };
    MyPollsDetailComponent.prototype.save = function () {
        var _this = this;
        if (!this.new_option) {
            return;
        }
        this.poll.options.push({ name: this.new_option, votes: 0 });
        this.pollService.updateMyPoll(this.poll)
            .then(function (res) { return res; }, function (err) { return _this.errMsg = err; });
    };
    MyPollsDetailComponent.prototype.delete = function (option) {
        var _this = this;
        this.poll.options.forEach(function (opt, i) {
            if (opt.name === option) {
                _this.poll.options.splice(i, 1);
            }
        });
        this.poll.options.filter(function (opt) { return opt.hasOwnProperty('name') === true; });
        this.pollService.updateMyPoll(this.poll)
            .then(function () { return null; }, function (err) { return _this.errMsg = err; });
    };
    MyPollsDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    MyPollsDetailComponent.prototype.show = function () {
        this.hide = !this.hide;
    };
    return MyPollsDetailComponent;
}());
MyPollsDetailComponent = __decorate([
    core_1.Component({
        templateUrl: './mypolls-detail.component.html',
        styleUrls: ['./mypolls-detail.component.css']
    }),
    __metadata("design:paramtypes", [poll_service_1.PollService,
        router_1.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], MyPollsDetailComponent);
exports.MyPollsDetailComponent = MyPollsDetailComponent;
//# sourceMappingURL=mypolls-detail.component.js.map