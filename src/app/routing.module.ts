import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PollDetailComponent } from './poll-detail.component';
import { PollListComponent } from './poll-list.component';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { AddPollComponent } from './add-poll.component';
import { LoggedInGuard } from './logged-in-guard';
import { MyPollsComponent } from './mypolls.component';
import { MyPollsDetailComponent } from './mypolls-detail.component';
import { EditProfileComponent } from './edit-profile.component';
import { ConfirmProfileChangesComponent } from './confirm-profile-changes.component';
import { DeleteProfileComponent } from './delete-profile.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
    { path: 'home', component: PollListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'poll-detail/:id', component: PollDetailComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: AddPollComponent, canActivate: [LoggedInGuard] },
    { path: 'mypolls', component: MyPollsComponent, canActivate: [LoggedInGuard] },
    { path: 'mypolls/detail/:id', component: MyPollsDetailComponent, canActivate: [LoggedInGuard] },
    { path: 'edit', component: EditProfileComponent, canActivate: [LoggedInGuard] },
    { path: 'confirm-edits', component: ConfirmProfileChangesComponent, canActivate: [LoggedInGuard] },
    { path: 'delete-profile', component: DeleteProfileComponent, canActivate: [LoggedInGuard] },
    { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}