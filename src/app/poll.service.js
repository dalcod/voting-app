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
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var chart_1 = require("./chart");
var http_client_service_1 = require("./http-client.service");
var PollService = (function () {
    function PollService(http, httpAuth) {
        this.http = http;
        this.httpAuth = httpAuth;
        this.loggedIn = false;
        this.errMsg = '';
        this.httpErr = '';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.chart = chart_1.CHART;
        this.loggedIn = !!localStorage.getItem('token');
    }
    PollService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.status + ' - ' + error.statusText;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    };
    PollService.prototype.getPolls = function () {
        return this.http.get('/polls')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.getPoll = function (id) {
        return this.http.get('/detail/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.getMyPolls = function () {
        var username = localStorage.getItem('username');
        return this.httpAuth.getAuth('/mypolls/' + username)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.getMyPoll = function (id) {
        return this.httpAuth.getAuth('/mypoll/detail/' + id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.updateMyPoll = function (poll) {
        return this.httpAuth
            .putAuth('/mypolls/detail', JSON.stringify(poll))
            .toPromise()
            .then(function () { return poll; })
            .catch(this.handleError);
    };
    PollService.prototype.deleteMyPoll = function (id) {
        return this.httpAuth.deleteAuth('/mypoll/' + id)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PollService.prototype.create = function (poll) {
        return this.httpAuth.postAuth('/poll', JSON.stringify(poll))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.update = function (poll) {
        return this.httpAuth
            .putAuth('/mypolls/detail', JSON.stringify(poll))
            .toPromise()
            .then(function () { return poll; })
            .catch(this.handleError);
    };
    PollService.prototype.delete = function (id) {
        return this.httpAuth.deleteAuth('/mypoll/' + id)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PollService.prototype.getCount = function () {
        return this.http.get('/poll-count')
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.updateCount = function (count) {
        return this.http.put('/poll-count', JSON.stringify(count), { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PollService.prototype.cleanNewPollOptions = function (options) {
        var newOptions = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i] === '') {
                options.splice(i, 1);
                i--;
            }
            else {
                newOptions.push({ name: options[i], votes: 0 });
            }
        }
        if (options.length < 2) {
            this.errMsg = 'You must insert at least 2 options';
            return;
        }
        return newOptions;
    };
    PollService.prototype.getPollOptions = function (poll) {
        var selData = [];
        selData.length = poll.options.length;
        poll.options.forEach(function (obj, i) {
            selData[i] = new Array(obj.name, obj.votes);
        });
        return selData;
    };
    PollService.prototype.updateChart = function (options) {
        var votesCount = 0;
        for (var i = 0; i < options.length; i++) {
            votesCount += options[i][1];
        }
        if (votesCount !== 0) {
            this.chart.dataTable.length = 1;
        }
        else {
            this.chart.dataTable.length = 1;
            this.chart.dataTable[1] = ['', 100];
        }
        for (var i = 0; i < options.length; i++) {
            if (options[i][1] === 0) {
                continue;
            }
            this.chart.dataTable.push(options[i]);
        }
        if (this.chart.dataTable[1][0] !== '') {
            this.chart.options.pieSliceText = 'percentage';
        }
    };
    ;
    return PollService;
}());
PollService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_client_service_1.HttpClient])
], PollService);
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map