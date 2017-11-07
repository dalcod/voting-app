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
var PollDetailComponent = (function () {
    function PollDetailComponent(pollService, route, location, router) {
        this.pollService = pollService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.options = [];
        this.errMsg = '';
    }
    PollDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pieChartOptions = chart_1.CHART;
        this.pieChartOptions.length = 1;
        this.route.params
            .switchMap(function (params) { return _this.pollService.getPoll(+params['id']).then(function (res) {
            return res;
        }, function (err) { return _this.errMsg = err; }); })
            .subscribe(function (selectedPoll) {
            _this.poll = selectedPoll;
            if (_this.poll) {
                _this.options = _this.pollService.getPollOptions(selectedPoll);
                _this.pollService.updateChart(_this.options);
            }
        });
    };
    PollDetailComponent.prototype.updateVote = function () {
        var _this = this;
        this.poll.options.forEach(function (obj) {
            if (obj.name === _this.selOption) {
                obj.votes += 1;
            }
        });
        return this.poll;
    };
    PollDetailComponent.prototype.save = function () {
        var _this = this;
        this.pieChartOptions.options.pieSliceText = 'percentage';
        this.pollService.update(this.updateVote())
            .then(function () { return _this.location.back(); }, function (err) { return _this.errMsg = err; });
    };
    PollDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return PollDetailComponent;
}());
PollDetailComponent = __decorate([
    core_1.Component({
        templateUrl: './poll-detail.component.html',
        styleUrls: ['./poll-detail.component.css']
    }),
    __metadata("design:paramtypes", [poll_service_1.PollService,
        router_1.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], PollDetailComponent);
exports.PollDetailComponent = PollDetailComponent;
//# sourceMappingURL=poll-detail.component.js.map