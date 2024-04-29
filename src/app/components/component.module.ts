import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { BookingsComponent } from './bookings/bookings.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ManagersComponent } from './managers/managers.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ViewStadiumComponent } from './stadiums/view-stadium/view-stadium.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewMatchesComponent } from './stadiums/view-matches/view-matches.component';

@NgModule({
  declarations: [
    NavbarComponent,
    StadiumsComponent,
    ErrorPageComponent,
    BookingsComponent,
    ApprovalsComponent,
    ManagersComponent,
    HomeComponent,
    ViewStadiumComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    SignUpComponent,
    ViewMatchesComponent
  ],
  imports: [BrowserModule,RouterModule,ReactiveFormsModule],
  providers: [],
  exports: [
    NavbarComponent,
    StadiumsComponent,
    ErrorPageComponent,
    BookingsComponent,
    ApprovalsComponent,
    ManagersComponent,
    HomeComponent,
    ViewStadiumComponent,
    LoginComponent,
    ReactiveFormsModule,
    BrowserModule,
    LoadingSpinnerComponent,
    SignUpComponent,
    ViewMatchesComponent,
  ],
})
export class ComponentModule {}
