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
var poll_service_1 = require("./poll.service");
var PollListComponent = (function () {
    function PollListComponent(pollService) {
        this.pollService = pollService;
        this.data = [];
    }
    PollListComponent.prototype.getPolls = function () {
        var _this = this;
        this.pollService.getPolls()
            .then(function (polls) {
            _this.errMsg = '';
            _this.myPolls = polls;
            _this.myPolls.sort(function (first, second) {
                if (first.id === second.id) {
                    return 0;
                }
                if (first.id > second.id) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }, function (err) {
            _this.errMsg = err;
        });
    };
    PollListComponent.prototype.ngOnInit = function () {
        this.getPolls();
    };
    return PollListComponent;
}());
PollListComponent = __decorate([
    core_1.Component({
        templateUrl: './poll-list.component.html',
        styleUrls: ['./poll-list.component.css']
    }),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], PollListComponent);
exports.PollListComponent = PollListComponent;
//# sourceMappingURL=poll-list.component.js.map