import { Component, OnInit } from '@angular/core';
import { BachelorService } from 'src/app/bachelor-service.service';
import { Observable } from 'rxjs';
import { Contestant, User } from 'src/app/models';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent implements OnInit {

  isLoaded: boolean = false;
  showEliminatedContestants: boolean = true;

  constructor(private _bachelorService: BachelorService) { }

  contestants: Contestant[];
  users: User[];

  ngOnInit() {
    this._bachelorService.getContestants().subscribe(contestants => {
      this.contestants = contestants;
      this.isLoaded = true;
    });

    this._bachelorService.getUsers().subscribe(users => this.users === users);
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
  }

  saveToUser(user: string, contestant: Contestant) {

    // TODO: test
    if (user === "None") {
      for (let u of this.users) {
        const index = u.contestants.findIndex(i => i.name === contestant.name);
        u.contestants.splice(index, 1);
      }
    } else {
      let findUser = this.users.find(u => u.name === user);
      findUser.contestants.push(contestant);
    }

    // Now save
  }

  toggleEliminatedContestants() {
    this.showEliminatedContestants = this.showEliminatedContestants ? false : true;
  }

}
