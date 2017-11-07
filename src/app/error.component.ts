import { Component, OnInit } from '@angular/core';

import { PollService } from './poll.service';
import { UserService } from './user.service';

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
 
 export class ErrorComponent implements OnInit {
     public errMsg: string;
     constructor (private pollService: PollService, private userService: UserService) {}
     ngOnInit() {
     }
 }