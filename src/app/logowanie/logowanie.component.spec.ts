// logowanie.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogowanieComponent } from './logowanie.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LogowanieComponent', () => {
  let component: LogowanieComponent;
  let fixture: ComponentFixture<LogowanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogowanieComponent ],
      imports: [ FormsModule ] // Importujesz FormsModule, ponieważ używasz ngModel
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogowanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien utworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('przycisk logowania powinien być początkowo wyłączony', () => {
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.disabled).toBeTruthy();
  });

  it('przycisk logowania powinien być aktywny, gdy wszystkie pola są wypełnione', () => {
    // Ustaw wartości dla pól formularza
    component.formData.username = 'testuser';
    component.formData.password = 'testpassword';
    
    // Aktualizuj stan komponentu i UI
    fixture.detectChanges();

    // Znajdź przycisk i sprawdź, czy jest aktywny
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.disabled).toBeFalsy(); // Sprawdzamy, czy przycisk NIE jest wyłączony
  });

  // Dodaj więcej testów zgodnie z wymaganiami Twojej aplikacji, np. czy metoda logowania jest wywoływana, gdy formularz jest przesyłany i tak dalej.
});
