import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { GlobalStateService } from './global-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state = this.globalStateService.getState();
  constructor(private globalStateService: GlobalStateService) {}
  ngOnInit(): void {
  }
}
