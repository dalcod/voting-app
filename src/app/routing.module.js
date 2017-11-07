"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var poll_detail_component_1 = require("./poll-detail.component");
var poll_list_component_1 = require("./poll-list.component");
var signup_component_1 = require("./signup.component");
var login_component_1 = require("./login.component");
var add_poll_component_1 = require("./add-poll.component");
var logged_in_guard_1 = require("./logged-in-guard");
var mypolls_component_1 = require("./mypolls.component");
var mypolls_detail_component_1 = require("./mypolls-detail.component");
var edit_profile_component_1 = require("./edit-profile.component");
var confirm_profile_changes_component_1 = require("./confirm-profile-changes.component");
var delete_profile_component_1 = require("./delete-profile.component");
var error_component_1 = require("./error.component");
var routes = [
    { path: 'home', component: poll_list_component_1.PollListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'poll-detail/:id', component: poll_detail_component_1.PollDetailComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'profile', component: add_poll_component_1.AddPollComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: 'mypolls', component: mypolls_component_1.MyPollsComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: 'mypolls/detail/:id', component: mypolls_detail_component_1.MyPollsDetailComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: 'edit', component: edit_profile_component_1.EditProfileComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: 'confirm-edits', component: confirm_profile_changes_component_1.ConfirmProfileChangesComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: 'delete-profile', component: delete_profile_component_1.DeleteProfileComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: '**', component: error_component_1.ErrorComponent }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map