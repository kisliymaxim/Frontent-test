import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PaginationModule } from 'ng2-pagination'; //importing ng2-pagination

import { AppComponent }  from './app.component';
import { MainComponent }  from './components/main/main.component';
import { LoginComponent }  from './components/login/login.component';
import { RegistrationComponent }  from './components/registration/registration.component';
import { ProductComponent }  from './components/product/product.component';
import { RatingComponent }  from './components/rating/rating.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';

import { AuthGuard } from './_guards/auth.guard';
import { ProductsService } from './services/products/products.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UsersService } from './services/users/users.service';

import {routing} from './app.routing';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, ReactiveFormsModule, Ng2PaginationModule ],
  declarations: [ AppComponent, MainComponent, LoginComponent, RegistrationComponent, ProductComponent, RatingComponent, DashboardComponent ],
  providers:    [ AuthGuard, AuthenticationService, UsersService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
