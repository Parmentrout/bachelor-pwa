import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { SnackBarListenerService } from './snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private snackBar: MatSnackBar, private swUpdate: SwUpdate) {

    // Check for available updates
    swUpdate.available.subscribe(event => 
      this.openSnackBar('Updates are available, would you like to refresh?', 'Update'));

    // Check if updates have been applied
    swUpdate.activated.subscribe(event => {
      this.openSnackBar('Bachelor Tracker Updated');
    })

  }

  openSnackBar(message: string, action: string = null) {
    if (action) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    } else {
      this.snackBar.open(message);
    }
   
  }
}
