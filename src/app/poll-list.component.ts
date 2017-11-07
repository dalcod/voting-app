import { Component, OnInit } from '@angular/core';

import { Poll } from './poll';
import { PollService } from './poll.service';

@Component({
    templateUrl: './poll-list.component.html',
    styleUrls: ['./poll-list.component.css']
})

export class PollListComponent implements OnInit {
    constructor(private pollService: PollService) {}

    myPolls: Poll[];
    data: any = [];
    errMsg: string;

    getPolls(): void {
        this.pollService.getPolls()
            .then(polls => {
                    this.errMsg = '';
                    this.myPolls = polls;
                    this.myPolls.sort((first, second) => {
                        if (first.id === second.id) { return 0; }
                        if (first.id > second.id) { return -1; }
                        else { return 1; } 
                    })
                },
                err => {
                    this.errMsg = err;
                });
    }

    ngOnInit(): void {
        this.getPolls();
    }
}