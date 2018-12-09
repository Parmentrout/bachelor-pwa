import { Component, OnInit } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Observable } from 'rxjs';
import { Contestant } from 'src/app/models';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent implements OnInit {

  constructor(private _bachelorService: BachelorService) { }

  contestants$: Observable<Contestant[]> = this._bachelorService.getContestants();

  ngOnInit() {

  }

  eliminateContestant(contestant: Contestant) {
    console.log(contestant);
  }

}
