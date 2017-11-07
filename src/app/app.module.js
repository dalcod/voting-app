"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var forms_2 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_google_charts_1 = require("ng2-google-charts");
var poll_service_1 = require("./poll.service");
var user_service_1 = require("./user.service");
var http_client_service_1 = require("./http-client.service");
var logged_in_guard_1 = require("./logged-in-guard");
var app_component_1 = require("./app.component");
var poll_detail_component_1 = require("./poll-detail.component");
var poll_list_component_1 = require("./poll-list.component");
var routing_module_1 = require("./routing.module");
var add_poll_component_1 = require("./add-poll.component");
var login_component_1 = require("./login.component");
var signup_component_1 = require("./signup.component");
var mypolls_component_1 = require("./mypolls.component");
var mypolls_detail_component_1 = require("./mypolls-detail.component");
var edit_profile_component_1 = require("./edit-profile.component");
var confirm_profile_changes_component_1 = require("./confirm-profile-changes.component");
var delete_profile_component_1 = require("./delete-profile.component");
var error_component_1 = require("./error.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            ng2_google_charts_1.Ng2GoogleChartsModule,
            http_1.HttpModule,
            forms_2.ReactiveFormsModule,
            routing_module_1.RoutingModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            poll_detail_component_1.PollDetailComponent,
            poll_list_component_1.PollListComponent,
            add_poll_component_1.AddPollComponent,
            login_component_1.LoginComponent,
            signup_component_1.SignupComponent,
            mypolls_component_1.MyPollsComponent,
            mypolls_detail_component_1.MyPollsDetailComponent,
            edit_profile_component_1.EditProfileComponent,
            confirm_profile_changes_component_1.ConfirmProfileChangesComponent,
            delete_profile_component_1.DeleteProfileComponent,
            error_component_1.ErrorComponent
        ],
        providers: [poll_service_1.PollService, user_service_1.UserService, logged_in_guard_1.LoggedInGuard, http_client_service_1.HttpClient],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map