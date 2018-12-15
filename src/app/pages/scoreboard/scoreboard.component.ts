import { Component, OnInit } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Observable } from 'rxjs';
import { Season } from 'src/app/models';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {

  seasons$: Observable<Season[]> = this._bachelorService.getScoreboard();

  constructor(private _bachelorService: BachelorService) { }

  ngOnInit() {
  }

}
