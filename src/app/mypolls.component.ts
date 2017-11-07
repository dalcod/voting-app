import { Component, OnInit } from '@angular/core';

import { Poll } from './poll';
import { PollService } from './poll.service';

@Component({
    templateUrl: './mypolls.component.html',
    styleUrls: ['./poll-list.component.css', './mypolls.component.css']
})

export class MyPollsComponent {
    constructor(private pollService: PollService) {}

    myPolls: Poll[];
    data: any = [];
    warning = false;
    errMsg: string = '';
    
    getMyPolls(): void {
        this.pollService.getMyPolls().then(res => {
            if (res.length > 0) {
                this.warning = false;
                this.myPolls = res;
            } else {
                this.warning = true;
            }
        },
        err => this.errMsg = err);
    }
    
    ngOnInit(): void {
        this.getMyPolls();
    }
    
    delete(poll: Poll): void {
        this.pollService.delete(poll.id)
            .then(() => this.myPolls = this.myPolls.filter(p => p !== poll),
                 err => this.errMsg = err);
    };
}
