import { Component, OnInit } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Contestant } from 'src/app/models';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-fantasy',
  templateUrl: './fantasy.component.html',
  styleUrls: ['./fantasy.component.scss']
})
export class FantasyComponent implements OnInit {

  amberContestants: Contestant[] = new Array<Contestant>();

  patrickContestants: Contestant[] = new Array<Contestant>();

  isLoaded: boolean = false;

  private _cancellationToken: Subject<void> = new Subject();

  constructor(private _bachelorService: BachelorService) { }

  ngOnInit() {

    this._bachelorService.getContestants().pipe(takeUntil(this._cancellationToken)).subscribe(results => {
      this.amberContestants = this.filterContestants('Amber', results);
      this.patrickContestants = this.filterContestants('Patrick', results);
      this.isLoaded = true;
    })
  }

  filterContestants(name: string, contestants: Contestant[]): Contestant[] {
    let result = new Array<Contestant>();

    for (let contestant of contestants) {
      if (contestant.selectedBy === name) {
        result.push(contestant);
      }
    }
    console.log(result);
    return result;
  }

}
