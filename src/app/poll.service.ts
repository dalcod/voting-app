import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Poll } from './poll';
import { CHART } from './chart';
import { HttpClient } from './http-client.service';

@Injectable() 
export class PollService {
    private loggedIn = false;
    public errMsg: string = '';
    public httpErr: string = '';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private httpAuth: HttpClient){
        this.loggedIn = !!localStorage.getItem('token');
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.status + ' - ' + error.statusText;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }


    public getPolls(): Promise<Poll[]> {
        return this.http.get('/polls')
            .toPromise()
            .then(response => response.json() as Poll[])
            .catch(this.handleError);
    }

    public getPoll(id: number): Promise<Poll> {
        return this.http.get('/detail/' + id)
            .toPromise()
            .then(response => response.json() as Poll)
            .catch(this.handleError);
    }

    public getMyPolls(): Promise<Poll[]> {
        let username = localStorage.getItem('username');
        return this.httpAuth.getAuth('/mypolls/' + username)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    public getMyPoll(id: number): Promise<Poll> {
        return this.httpAuth.getAuth('/mypoll/detail/' + id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    public updateMyPoll(poll: any): Promise<Poll> {
        return this.httpAuth
            .putAuth('/mypolls/detail', JSON.stringify(poll))
            .toPromise()
            .then(() => poll)
            .catch(this.handleError);
    }

    public deleteMyPoll(id: number): Promise<void> {
        return this.httpAuth.deleteAuth('/mypoll/' + id)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public create(poll: Poll): Promise<Poll> {
        return this.httpAuth.postAuth('/poll', JSON.stringify(poll))
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    public update(poll: any): Promise<Poll> {
        return this.http
            .put('/mypolls/detail', JSON.stringify(poll), {headers: this.headers})
            .toPromise()
            .then(() => poll)
            .catch(this.handleError);
    }

    public delete(id: number): Promise<void> {
        return this.httpAuth.deleteAuth('/mypoll/' + id)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public getCount(): Promise<any> {
        return this.http.get('/poll-count')
            .toPromise()
            .then(res => {
            console.log(res.json())
            return res.json()})
            .catch(this.handleError);
    }

    public updateCount(count: any): Promise<any> {
        return this.http.put('/poll-count', JSON.stringify(count), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public cleanNewPollOptions(options: any[]): [{name: string, votes: number}] {
        let newOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i] === '') {
                options.splice(i, 1);
                i--;
            } else {
                newOptions.push({name: options[i], votes: 0});
            }
        }
        if(options.length < 2) {
            this.errMsg = 'You must insert at least 2 options';
            return;
        }
        return newOptions as [{name: string, votes: number}];
    }

public getPollOptions(poll: Poll): any[] {
    let selData: any[] = [];
    selData.length = poll.options.length;
    poll.options.forEach((obj: any, i: number) => {
        selData[i] = new Array(obj.name, obj.votes);
    });
    return selData;
}

public chart = CHART;
public updateChart(options: any[]): any {
    let votesCount = 0;
    for (let i = 0; i < options.length; i++) {
        votesCount += options[i][1];
    }
    if (votesCount !== 0) {
        this.chart.dataTable.length = 1;
    } else {
        this.chart.dataTable.length = 1;
        this.chart.dataTable[1] = ['', 100];
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i][1] === 0) {
            continue;
        }
        this.chart.dataTable.push(options[i]);
    }
    if(this.chart.dataTable[1][0] !== ''){
        this.chart.options.pieSliceText = 'percentage';
    }
};
} 