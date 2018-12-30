import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BachelorResponse, Contestant, Season } from './models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class BachelorService {
    private readonly contestantUrl: string = 'https://bachelor-pwa.firebaseio.com/contestants.json';
    private readonly scoreBoardUrl: string = 'https://bachelor-pwa.firebaseio.com/scoreboard.json'


    constructor(private httpClient: HttpClient) { }

    getContestants(): Observable<Contestant[]> {
        return this.httpClient.get(this.contestantUrl).pipe(map(result => {
            let results = result as Contestant[];
            let sortedResults = _.sortBy(results, r => r.name);

            return sortedResults;
        }));
    }

    saveContestants(contestants: Contestant[]): Observable<Contestant[]> {
        return this.httpClient.put(this.contestantUrl, contestants).pipe(map(results => results as Contestant[]));
    }

    getScoreboard(): Observable<Season[]> {
        return this.httpClient.get(this.scoreBoardUrl).pipe(map(result => result as Season[]));
    }

    // curl 'https://bachelor-pwa.firebaseio.com/contestants'
}