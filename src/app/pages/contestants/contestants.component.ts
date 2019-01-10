import { Component, OnInit, OnDestroy } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Observable, Subject } from 'rxjs';
import { Contestant } from 'src/app/models';
import { takeUntil } from 'rxjs/operators';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent implements OnInit, OnDestroy {

  isLoaded: boolean = false;
  showEliminatedContestants: boolean = true;
  contestants: Contestant[];

  private _cancellationToken: Subject<any> = new Subject();

  constructor(private _bachelorService: BachelorService) { }

  ngOnInit() {
    this._bachelorService.getContestants().pipe(takeUntil(this._cancellationToken)).subscribe(contestants => {
      this.contestants = contestants;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this._cancellationToken.next();
    this._cancellationToken.complete();
  }

  saveChanges() {
    this.isLoaded = false;
    this._bachelorService.saveContestants(this.contestants).subscribe(result => {
      this.contestants = result;
      this.isLoaded = true;
    });
  }

  toggleContestant(contestant: Contestant) {
    contestant.isDumped = contestant.isDumped ? false : true;

    this.saveChanges();
  }

  saveToUser(user: string, contestant: Contestant) {

    if (user === "None") {
      contestant.selectedBy = '';
    } else {
      contestant.selectedBy = user;
    }

    this.saveChanges();
  }

  toggleEliminatedContestants() {
    this.showEliminatedContestants = this.showEliminatedContestants ? false : true;
  }

}
