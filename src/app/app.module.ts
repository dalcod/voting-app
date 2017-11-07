import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { PollService } from './poll.service';
import { UserService } from './user.service';
import { HttpClient } from './http-client.service';
import { LoggedInGuard } from './logged-in-guard';

import { AppComponent } from './app.component';
import { PollDetailComponent } from './poll-detail.component';
import { PollListComponent } from './poll-list.component';
import { RoutingModule } from './routing.module';
import { AddPollComponent } from './add-poll.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { MyPollsComponent } from './mypolls.component';
import { MyPollsDetailComponent } from './mypolls-detail.component';
import { EditProfileComponent } from './edit-profile.component';
import { ConfirmProfileChangesComponent } from './confirm-profile-changes.component';
import { DeleteProfileComponent } from './delete-profile.component';
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2GoogleChartsModule,
        HttpModule,
        ReactiveFormsModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        PollDetailComponent,
        PollListComponent,
        AddPollComponent,
        LoginComponent,
        SignupComponent,
        MyPollsComponent,
        MyPollsDetailComponent,
        EditProfileComponent,
        ConfirmProfileChangesComponent,
        DeleteProfileComponent,
        ErrorComponent
    ],
    providers: [PollService, UserService, LoggedInGuard, HttpClient],
    bootstrap:  [AppComponent]
})

export class AppModule { }