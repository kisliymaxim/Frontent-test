import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    loginForm : FormGroup;
    loading = false;
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService, fb: FormBuilder) {
        this.loginForm = fb.group({
            'username' : [null, Validators.required],
            'password' : [null, Validators.required]
        })
    }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login(value: any){
        this.loading = true;
        this.authenticationService.login(value.username, value.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}