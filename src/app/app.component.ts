import { Component, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { SnackBarListenerService } from './snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private readonly vapidKey = "BN_IR7AHynzjzbh3nR3-yQFgnMjHRfndMDrXDFXLZAAWPCT1tMPdVcrL4RRSodK37CMT6gbaYjU8LQ0ExQL6oTM";

  constructor(private snackBar: MatSnackBar, private swUpdate: SwUpdate, private swPush: SwPush) {

    this.subscribeToUpdates();
  }

  ngAfterViewInit() {
    this.subscribeToPushNotifications();
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

  private subscribeToUpdates() {
      // Check for available updates
      this.swUpdate.available.subscribe(event => 
      this.openSnackBar(`Updates are available version: ${event.available}`, 'Update'));

      // Check if updates have been applied
      this.swUpdate.activated.subscribe(event => {
      this.openSnackBar(`Bachelor Tracker Updated: ${event.current}`);
    });
  }

  private subscribeToPushNotifications() {
   
    this.swPush.requestSubscription({
      serverPublicKey: this.vapidKey
    })
    .then(result => console.log('User successfully subscribed to notifications')) // Returns a user specific key that in turn you'll send with other notifications
    .catch(error => console.log('User said no'));

    this.swPush.messages.subscribe(message => console.log(`Message received: ${message}`));
  }
}
