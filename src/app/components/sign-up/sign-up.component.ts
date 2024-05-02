import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/service/Auth.Service';
import { StadiumService } from '../stadiums/stadium.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup: FormGroup;
  isError: boolean = false;
  errorMessage: any = '';
  stadiums: any = [];

  constructor(
    private authService: AuthService,
    private route: Router,
    private stadiumService: StadiumService
  ) {
    this.signUpFormGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      agree: new FormControl('', [Validators.requiredTrue]),
      isManager: new FormControl('', []),
    });

    this.signUpFormGroup
      .get('isManager')
      ?.valueChanges.subscribe((val: any) => {
        if (val) {
          this.signUpFormGroup.addControl(
            'stadiumName',
            new FormControl('', [Validators.required])
          );
          this.stadiumService.getStadiumsFromSource().subscribe({
            next: (val) => {
              if (val) {
                this.stadiums = val;
              }
            },
            error: (error) => {
              this.isError = true;
              this.errorMessage = 'Unable to load stadiums.';
              this.stadiums = [];
              console.log(error);
            },
          });
        }
      });
  }

  onSignUp() {
    let form = this.signUpFormGroup.value;
    form.name = form.firstName + ' ' + form.lastName;
    this.authService.signUp(form).subscribe({
      next: (res) => {
        if (res) {
          if (form.isManager) {
            this.route.navigate(['/login'], {
              state: { data: 'Sign up requires admin approval for manager' },
            });
          }
          this.route.navigate(['/login'], {
            state: { data: 'Sign up successfulyy done login.' },
          });
        }
      },
      error: (errorRes) => {
        if (errorRes.status == 201) {
          this.route.navigate(['/login']);
        }
        if (errorRes.status >= 400 || errorRes.status < 500) {
          if (errorRes.status == 409 && !errorRes?.error?.message) {
            this.errorMessage = errorRes?.error;
          } else {
            this.errorMessage = errorRes?.error?.message
              ? errorRes?.error?.message
              : '';
          }
        }
      },
    });
    console.log(this.signUpFormGroup.value);
  }
}
