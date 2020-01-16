import { Component, OnInit } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Observable } from 'rxjs';
import { Season } from 'src/app/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {

  seasons$: Observable<Season[]> = this._bachelorService.getScoreboard();
  amberBachScore = 0;
  patrickBachScore = 0;

  amberWinnerScore = 0;
  patrickWinnerScore = 0;
  constructor(private _bachelorService: BachelorService) { }


  ngOnInit() {

    this.seasons$.pipe(take(1)).subscribe(results => {

      for (let result of results) {
        if (result.pickedBach === "Amber") { this.amberBachScore++;}
        if (result.pickedBach === "Patrick") { this.patrickBachScore++;}
        if (result.pickedWinner === "Amber") { this.amberWinnerScore++;}
        if (result.pickedWinner === "Patrick") { this.patrickWinnerScore++;}
      }
  });
}

}
