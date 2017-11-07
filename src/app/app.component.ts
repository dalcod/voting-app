import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor (private router: Router,
                 private userService: UserService) {}
    
    public isLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }
    
    public logout(): void {
         this.userService.logout();
         this.router.navigate(['/home']);
    }
}