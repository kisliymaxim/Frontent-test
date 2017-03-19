import { Component, DoCheck } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements DoCheck {
  
  public appState: boolean; //current state (logged or unlogged user)

  constructor() {
    if(localStorage.getItem('currentUser') != null)
      this.appState = true;
    else
      this.appState = false;
  }

  ngDoCheck() { 
    if(localStorage.getItem('currentUser') != null)
      this.appState = true;
    else
      this.appState = false;
  }
}
