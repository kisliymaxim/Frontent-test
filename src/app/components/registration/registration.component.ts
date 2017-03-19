import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../../services/users/users.service';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    providers: [UsersService]
})

export class RegistrationComponent {
    loading = false;
    registrForm : FormGroup;

    constructor(private router: Router, private userService: UsersService, fb: FormBuilder) {
        this.registrForm = fb.group({
            'firstName' : [null, Validators.required],
            'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
            'username' : [null, Validators.required],
            'password' : [null, Validators.required]
        });
    }

    register(value: any){
        this.loading = true;
        this.userService.create(value).subscribe(data => {            
            this.router.navigate(['/login']);//Registration successful
        });
    }
}
