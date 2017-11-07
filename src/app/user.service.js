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
require("rxjs/add/operator/toPromise");
var http_client_service_1 = require("./http-client.service");
var UserService = (function () {
    function UserService(http, httpAuth) {
        this.http = http;
        this.httpAuth = httpAuth;
        this.loggedIn = false;
        this.errMsg = '';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.loggedIn = !!localStorage.getItem('token');
    }
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.status + ' - ' + error.statusText;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Promise.reject(errMsg);
    };
    UserService.prototype.signup = function (username, password) {
        var _this = this;
        return this.http.post('/signup', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var resObj = res.json();
            if (resObj.success) {
                localStorage.setItem('token', resObj.token);
                _this.loggedIn = true;
                return resObj.success;
            }
            else {
                _this.errMsg = resObj.message;
                return false;
            }
        }).catch(this.handleError);
    };
    ;
    UserService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/login', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var resObj = res.json();
            if (resObj.success) {
                localStorage.setItem('token', resObj.token);
                _this.loggedIn = true;
                return resObj.success;
            }
            else {
                _this.errMsg = resObj.error;
                return false;
            }
        }).catch(this.handleError);
    };
    ;
    UserService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.loggedIn = false;
    };
    ;
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    ;
    UserService.prototype.setNewUsername = function (username) {
        var _this = this;
        return this.httpAuth.getAuth('/edit-profile/' + username)
            .toPromise()
            .then(function (res) {
            var obj = res.json();
            if (obj.error) {
                _this.errMsg = obj.error;
                return false;
            }
            else {
                _this.new_username = username;
                return obj.success;
            }
        })
            .catch(this.handleError);
    };
    UserService.prototype.getNewUsername = function () {
        return this.new_username;
    };
    UserService.prototype.updateProfile = function (newUsername, username, password) {
        var _this = this;
        return this.httpAuth.putAuth('/edit-profile', JSON.stringify({ newUsername: newUsername, username: username, password: password }))
            .toPromise()
            .then(function (res) {
            var obj = res.json();
            if (obj.error) {
                _this.errMsg = obj.error;
                return false;
            }
            else {
                return obj.success;
            }
        })
            .catch(this.handleError);
    };
    UserService.prototype.deleteProfile = function (username, password) {
        var _this = this;
        return this.httpAuth.deleteAuth('/edit-profile', JSON.stringify({ username: username, password: password }))
            .toPromise()
            .then(function (res) {
            var obj = res.json();
            if (obj.error) {
                _this.errMsg = obj.error;
                return false;
            }
            else {
                return obj.success;
            }
        })
            .catch(this.handleError);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_client_service_1.HttpClient])
], UserService);
exports.UserService = UserService;
;
//# sourceMappingURL=user.service.js.map