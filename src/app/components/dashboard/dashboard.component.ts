import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  providers: [AuthenticationService]
})
export class DashboardComponent {
    user = false;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        if(localStorage.getItem('currentUser') != null){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.user = currentUser.username;;
        }
    }
 
    logout() {
        // reset login status
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}