import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GlobalStateService } from '../global-state.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css'],
})
export class LogowanieComponent {
  loggedIn = true;
  formData = {
    username: '',
    password: '',
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private globalStateService: GlobalStateService,
    private router: Router
  ) {}
  updateState(): void {
    this.globalStateService.getState().subscribe((state) => {
      this.loggedIn = state.loggedIn;
    });
  }

  logowanie() {
    this.afAuth
      .signInWithEmailAndPassword(
        this.formData.username,
        this.formData.password
      )
      .then((result) => {
        console.log('Zalogowano pomyślnie!', result);
        this.successMessage = 'Zalogowano pomyślnie!';
        this.errorMessage = null;
        this.globalStateService.updateLoggedInStatus(true);
        this.updateState();
        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 1000);

        console.log(this.globalStateService.getState());
      })
      .catch((error) => {
        console.error('Błąd logowania:', error);
        this.errorMessage = this.translateFirebaseError(error.code);
        this.successMessage = null;
        this.formData.username = '';
        this.formData.password = '';
      });
  }

  translateFirebaseError(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Nieprawidłowy adres e-mail!';
      case 'auth/user-disabled':
        return 'Konto użytkownika zostało wyłączone!';
      case 'auth/user-not-found':
        return 'Nie znaleziono użytkownika o podanym adresie e-mail!';
      case 'auth/wrong-password':
        return 'Nieprawidłowe hasło!';
      default:
        return 'Wystąpił błąd podczas logowania!';
    }
  }
}
