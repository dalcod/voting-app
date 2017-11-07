import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Poll } from './poll';
import { CHART } from './chart';
import { PollService } from './poll.service';

@Component({
    templateUrl: './mypolls-detail.component.html',
    styleUrls: ['./mypolls-detail.component.css']
})


export class MyPollsDetailComponent implements OnInit {
    public poll: Poll;
    public options: any = [];
    public pieChartOptions: any;
    public selOption: any;
    public new_option: string;
    public hide: boolean = true;
    public errMsg: string = '';

    constructor(
    private pollService: PollService,
     private route: ActivatedRoute,
     private location: Location,
     private router: Router
    ) {}
    
    ngOnInit(): void { 
        this.pieChartOptions = CHART;
        this.route.params
            .switchMap((params: Params) => this.pollService.getMyPoll(+params['id']).then(res => res,
            err => this.errMsg = err))
            .subscribe(selectedPoll => {
            this.poll = selectedPoll;
            if (this.poll) {
                this.options = this.pollService.getPollOptions(selectedPoll);
                this.pollService.updateChart(this.options);
            }
        });
    }

    public save(): void {
        if(!this.new_option){
            return;
        }
        this.poll.options.push({name: this.new_option, votes: 0});
        this.pollService.updateMyPoll(this.poll)
            .then(res => res,
                 err => this.errMsg = err);
    }

    public delete(option: string): void {
        this.poll.options.forEach((opt, i) => {
            if (opt.name === option) {
                this.poll.options.splice(i, 1);
            }
        });
        this.poll.options.filter(opt => opt.hasOwnProperty('name') === true);
        this.pollService.updateMyPoll(this.poll)
            .then(() => null,
                 err => this.errMsg = err);
    }
    
    public goBack(): void {
        this.location.back();
    }
    
    public show(): void {
        this.hide = !this.hide;
    }
    
}