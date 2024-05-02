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
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewMatchesComponent } from './stadiums/view-matches/view-matches.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CreateStadiumComponent } from './stadiums/create-stadium/create-stadium.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { ScheduleMatchComponent } from './schedule-match/schedule-match.component';
import { ViewMatchComponent } from './stadiums/view-matches/view-match/view-match.component';

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
    SignUpComponent,
    ViewMatchesComponent,
    LoadingSpinnerComponent,
    CreateStadiumComponent,
    BookTicketsComponent,
    ScheduleMatchComponent,
    ViewMatchComponent
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
    SignUpComponent,
    ViewMatchesComponent,
    LoadingSpinnerComponent,
    CreateStadiumComponent,
    BookTicketsComponent,
    ScheduleMatchComponent,
    ViewMatchComponent
  ],
})
export class ComponentModule {}
