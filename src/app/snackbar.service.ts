import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from './app.component';

@Injectable({ providedIn: 'root' })
export class SnackBarListenerService {
    constructor(snackBar: MatSnackBar) {
        console.log('Service');
        const snackBarRef = snackBar.openFromComponent(AppComponent);

        snackBarRef.onAction().subscribe(() => {
            console.log('refreshed');
            window.location.reload();
        });
    }
}