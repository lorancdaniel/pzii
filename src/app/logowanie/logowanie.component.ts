import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent {
formData = {
  username: '',
  password: ''
};
form?: NgForm;

ngAfterViewInit(form: NgForm) {
  this.form = form;
}


logowanie() { 
  if (this.formData.username === "testUser" && this.formData.password === "testPassword") {
  alert("Zalogowano");
  return 0;
  } else {
  alert("Błąd logowania");
  return 1;
  }
}
}
