// global-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private state: BehaviorSubject<any> = new BehaviorSubject({
    loggedIn: false,
  });

  constructor() { }

  getState() {
    return this.state.asObservable();
  }

  updateLoggedInStatus(status: boolean) {
  const currentState = this.state.getValue();
  this.state.next({
    ...currentState,
    loggedIn: status
  })}
}
