import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BachelorResponse, Contestant } from './models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BachelorService {
    private readonly contestantUrl: string = 'https://bachelor-pwa.firebaseio.com/contestants.json';
    private readonly userUrl: string = 'https://bachelor-pwa.firebaseio.com/users.json'


    constructor(private httpClient: HttpClient) { }

    getContestants(): Observable<Contestant[]> {
        return this.httpClient.get(this.contestantUrl).pipe(map(result => result as Contestant[]));
    }

    saveContestants(contestants: Contestant[]): Observable<Contestant[]> {
        return this.httpClient.put(this.contestantUrl, contestants).pipe(map(results => results as Contestant[]));
    }

    // curl 'https://bachelor-pwa.firebaseio.com/contestants'
}