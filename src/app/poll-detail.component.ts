import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Poll } from './poll';
import { CHART } from './chart';
import { PollService } from './poll.service';

@Component({
    templateUrl: './poll-detail.component.html',
    styleUrls: ['./poll-detail.component.css']
})

export class PollDetailComponent implements OnInit {
    public poll: Poll;
    public options: any = [];
    public pieChartOptions: any;
    public selOption: any;
    public errMsg: string = '';

    constructor(
    private pollService: PollService,
     private route: ActivatedRoute,
     private location: Location,
     private router: Router
    ) {
    }

    ngOnInit(): void { 
        this.pieChartOptions = CHART;
        this.pieChartOptions.length = 1;
        this.route.params
            .switchMap((params: Params) => this.pollService.getPoll(+params['id']).then(res =>
            res,
            err => this.errMsg = err))
            .subscribe(selectedPoll => {
            this.poll = selectedPoll;
            if (this.poll) {
                this.options = this.pollService.getPollOptions(selectedPoll);
                this.pollService.updateChart(this.options);
            }
        });
        }

    updateVote(): Poll {
        this.poll.options.forEach((obj) => {
            if (obj.name === this.selOption) {
                obj.votes += 1;
            }
        });
        return this.poll;
    }

    save(): void {
        this.pieChartOptions.options.pieSliceText = 'percentage';
        this.pollService.update(this.updateVote())
            .then(() => this.location.back(),
                 err => this.errMsg = err);
    }

    goBack(): void {
        this.location.back();
    }
}