import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav', // Przykładowy selektor, dostosuj do swojego komponentu
  templateUrl: './nav.component.html', // Dostosuj do swojego komponentu
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  loggedIn!: boolean;
  private stateSubscription!: Subscription;

  constructor(
    private globalStateService: GlobalStateService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stateSubscription = this.globalStateService
      .getState()
      .subscribe((state) => {
        this.loggedIn = state.loggedIn;
      });
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
  logOff(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.globalStateService.updateLoggedInStatus(false);
        setTimeout(() => {
          this.router.navigate(['/logowanie']);
        }, 1000);
      })
      .catch((error) => {
        console.error('Błąd podczas wylogowywania:', error);
      });
  }
}
