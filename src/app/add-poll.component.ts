import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Poll } from './poll';
import { PollService } from './poll.service';

@Component({
    templateUrl: './add-poll.component.html',
    styleUrls: ['./add-poll.component.css']
})

export class AddPollComponent implements OnInit{
    constructor(private pollService: PollService,
                 private router: Router,
                 private fb: FormBuilder
                ){
        this.createForm();
        this.addPollForm.valueChanges
        .subscribe(data => this.onValueChanges(data));
    }
    
    public addPollForm: FormGroup;
    public myPolls: Poll[];
    public hasChanged: boolean = false;
    public countObj: any;
    public username: string;
    public errMsg: string;
    public incomplete: string;
    public extraOptions: [{name: string, votes: number}] = [
        {name: '', votes: 0},
        {name: '', votes: 0}];
    public formErrors = {
        'title': '',
        'options': ''
    };
    public validationMessages = {
        'title': {
            'required': 'Title is required.',
            'pattern': 'Title can contain only letters, numbers or underscores'
        },
        'options': {
            'pattern': 'Options can contain only letters, numbers or underscores'
        }
    };

    public createForm(): void {
        this.addPollForm = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w ,]+$/)])],
            options: this.fb.array([])
        })
    }

    public setOptions(options: any[]) {
        const optionFGs = options.map(option =>  new FormControl(option.name, Validators.pattern(/^[\w ,]+$/)));
        const optionFormArray = this.fb.array(optionFGs);
        console.log(optionFGs)
        this.addPollForm.setControl('options', optionFormArray);
    }

    get options(): FormArray { return this.addPollForm.get('options') as FormArray; }

    public addOption(e: any): void {
        e.preventDefault()
        this.options.push(new FormControl('', Validators.pattern(/^[\w ,]+$/)));
    }

    public removeOption(e: any): void {
        e.preventDefault();
        if (this.options.length > 2) {
            this.options.removeAt(this.options.length - 1);
        } else {
            return;
        }
    }

    public onValueChanges(data: any) {
        this.incomplete = '';
        if (!this.addPollForm) { return; }
        const form = this.addPollForm;
        
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                if(field === 'options'){
                    for(let i = 0; i < control.value.length; i++){
                        for(const key in control.get(i + '').errors){
                           this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                } else {
                    for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
                }
            }
        }
    }

    public getCount(): void {
        this.pollService.getCount()
            .then(
                countObj => this.countObj = countObj,
                err => this.errMsg = err);
    }

    public ngOnInit(): void {
        this.errMsg = '';
        this.getCount();
        this.username = localStorage.getItem('username');
        this.setOptions(this.extraOptions);
    }
    
    public reset(e: any) {
        e.preventDefault();
        this.addPollForm.reset({
            title: ''
        });
        this.setOptions(this.extraOptions); 
    }
    
    public addPoll(formObj: any): void {
        if (!formObj.title) {
            this.incomplete = 'You must insert a title';
            return;
        }
        let count = this.countObj.count++;
        let options = this.pollService.cleanNewPollOptions(formObj.options);
        if (!options) {
            this.incomplete = this.pollService.errMsg;
            return;
        }
        let newPoll: Poll = {
            username: this.username,
            title: formObj.title,
            id: count,
            options: options
        }
        this.pollService.create(newPoll).then(() =>{
            this.pollService.updateCount(this.countObj)
                .then(() => this.router.navigate(['/home']),
                    err => this.errMsg = err);
        },
        err => {
            this.errMsg = err;
        }
    );
    
    }

}