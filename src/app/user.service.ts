import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from './http-client.service';

@Injectable()
export class UserService {
    private loggedIn = false;
    public errMsg: string = '';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http, private httpAuth: HttpClient) {
        this.loggedIn = !!localStorage.getItem('token');
    }

    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.status + ' - ' + error.statusText;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }

    public signup(username: string, password: string): Promise<any> {
        return this.http.post('/signup', JSON.stringify({username, password}), {headers: this.headers})
            .toPromise()
            .then(res => {
            let resObj = res.json();
            if (resObj.success) {
                localStorage.setItem('token', resObj.token);
                this.loggedIn = true;
                return resObj.success;
            } else {
                this.errMsg = resObj.message;
                return false;
            }
        }).catch(this.handleError);
    };

    public login(username: string, password: string): Promise<any> {
        return this.http.post('/login', JSON.stringify({username, password}), {headers: this.headers})
            .toPromise()
            .then(res => {
            let resObj = res.json();
            if (resObj.success) {
                localStorage.setItem('token', resObj.token);
                this.loggedIn = true;
                return resObj.success;
            } else {
                this.errMsg = resObj.error;
                return false;
            }
        }).catch(this.handleError);
    };

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.loggedIn = false;
    };

    public isLoggedIn(): boolean {
        return this.loggedIn;
    };

    public new_username: string;
    public setNewUsername(username: string): Promise<any> {
        return this.httpAuth.getAuth('/edit-profile/' + username)
            .toPromise()
            .then(res => {
            let obj = res.json();
            if (obj.error) {
                this.errMsg = obj.error;
                return false;
            } else {
                this.new_username = username;
                return obj.success;
            }
        }).catch(this.handleError);
    }

    public getNewUsername(): string {
        return this.new_username;
    }

    public updateProfile(newUsername: string,
                          username: string,
                          password: string): Promise<any> {
        return this.httpAuth.putAuth('/edit-profile', JSON.stringify({newUsername, username, password}))
            .toPromise()
            .then(res => {
            let obj = res.json();
            if (obj.error) {
                this.errMsg = obj.error;
                return false;
            } else {
                return obj.success;
            }
        }).catch(this.handleError);
    }

    public deleteProfile(username: string, password: string): Promise<any> {
        return this.httpAuth.deleteAuth('/edit-profile', JSON.stringify({username, password}))
            .toPromise()
            .then(res => {
            let obj = res.json();
            if (obj.error) {
                this.errMsg = obj.error;
                return false;
            } else {
                return obj.success;
            }
        }).catch(this.handleError);
    }
};