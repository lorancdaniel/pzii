import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogowanieComponent } from './logowanie.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GlobalStateService } from '../global-state.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

// Mock Firebase options
const FIREBASE_OPTIONS_TOKEN = {
  provide: 'firebaseOptions',
  useValue: {}, // Your Firebase config (can be empty for the tests)
};

// Mock AngularFireAuth
const mockAngularFireAuth: any = {
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
};

describe('LogowanieComponent', () => {
  let component: LogowanieComponent;
  let fixture: ComponentFixture<LogowanieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogowanieComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        FIREBASE_OPTIONS_TOKEN,
        GlobalStateService,
        Router,
      ],
    });

    fixture = TestBed.createComponent(LogowanieComponent);
    component = fixture.componentInstance;
  });

  it('should update loggedIn state', () => {
    const mockStateService = TestBed.inject(GlobalStateService);
    spyOn(mockStateService, 'getState').and.returnValue(
      of({ loggedIn: false })
    );

    component.updateState();
    expect(component.loggedIn).toBeFalse();
  });

  it('should log in successfully and navigate to /main', (done) => {
    const mockRouter = TestBed.inject(Router);
    const mockStateService = TestBed.inject(GlobalStateService);
    spyOn(mockStateService, 'getState').and.returnValue(of({ loggedIn: true }));
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({})
    );

    component.formData.username = 'test@example.com';
    component.formData.password = 'password123';
    component.logowanie();

    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
      expect(component.successMessage).toBe('Zalogowano pomyślnie!');
      expect(component.errorMessage).toBeNull();
      done();
    }, 1500);
  });

  it('should handle login error and display the error message', (done) => {
    const error = { code: 'auth/invalid-email' };
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.reject(error)
    );

    component.formData.username = 'invalid-email';
    component.formData.password = 'password123';
    component.logowanie();

    fixture.whenStable().then(() => {
      expect(component.errorMessage).toBe('Nieprawidłowy adres e-mail!');
      expect(component.successMessage).toBeNull();
      expect(component.formData.username).toBe('');
      expect(component.formData.password).toBe('');
      done();
    });
  });

  it('should translate Firebase errors correctly', () => {
    expect(component.translateFirebaseError('auth/invalid-email')).toBe(
      'Nieprawidłowy adres e-mail!'
    );
    expect(component.translateFirebaseError('auth/user-disabled')).toBe(
      'Konto użytkownika zostało wyłączone!'
    );
    expect(component.translateFirebaseError('auth/user-not-found')).toBe(
      'Nie znaleziono użytkownika o podanym adresie e-mail!'
    );
    expect(component.translateFirebaseError('auth/wrong-password')).toBe(
      'Nieprawidłowe hasło!'
    );
    expect(component.translateFirebaseError('some-unknown-error')).toBe(
      'Wystąpił błąd podczas logowania!'
    );
  });

  it('should update the global state after successful login', (done) => {
    const mockStateService = TestBed.inject(GlobalStateService);
    spyOn(mockStateService, 'getState').and.returnValue(
      of({ loggedIn: false })
    );
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({})
    );

    component.formData.username = 'test@example.com';
    component.formData.password = 'password123';
    component.logowanie();

    fixture.whenStable().then(() => {
      expect(mockStateService.updateLoggedInStatus).toHaveBeenCalledWith(true);
      expect(component.loggedIn).toBeTrue();
      done();
    });
  });
});
