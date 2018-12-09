import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BachelorResponse, Contestant } from './models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BachelorService {
    private readonly url: string = 'https://bachelor-pwa.firebaseio.com/contestants.json'

    constructor(private httpClient: HttpClient) { }

    getContestants(): Observable<Contestant[]> {
        return this.httpClient.get(this.url).pipe(map(result => result as Contestant[]));
    }
    // curl 'https://bachelor-pwa.firebaseio.com/contestants'
}