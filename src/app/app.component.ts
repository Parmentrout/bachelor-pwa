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

  public hasUpdates: boolean = false;

  private readonly vapidKey = "BN_IR7AHynzjzbh3nR3-yQFgnMjHRfndMDrXDFXLZAAWPCT1tMPdVcrL4RRSodK37CMT6gbaYjU8LQ0ExQL6oTM";

  constructor(private swUpdate: SwUpdate, private swPush: SwPush) {

    this.subscribeToUpdates();
  }

  ngAfterViewInit() {
    this.subscribeToPushNotifications();
  }

  updatePage() {
    window.location.reload();
  }

  private subscribeToUpdates() {
    // Check for available updates
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      this.hasUpdates = true;
    });

    // Check if updates have been applied
    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);

      this.hasUpdates = false;
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
