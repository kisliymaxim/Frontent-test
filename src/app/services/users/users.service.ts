import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { User } from '../../_models/user';

@Injectable()
export class UsersService {
    
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.post('http://smktesting.herokuapp.com/api/register/', user).map((response: Response) => response.json());
    }
}