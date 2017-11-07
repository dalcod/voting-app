export class Poll {
    username: string;
    title: string;
    id: number;
    options: [{
        name: string,
        votes: number
    }];
}
