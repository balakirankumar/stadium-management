import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  loggedIn: any = false;
  userObject: any;

  constructor(private _httpClient: HttpClient, private route:Router) {}

  isAuthenticated():any{ //Promise<boolean> {
    // const promise: Promise<boolean> = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (this.userObject?.roles.includes('admin')) {
    //       resolve(true);
    //     }
    //     resolve(false);
    //   }, 800);
    // });
    // return promise;
  }

  login(form: any): boolean {
    this.loggedIn = true;
    let headers1 = new HttpHeaders();
    headers1 = headers1.append('X-event-id', 'id');
    this._httpClient
      .post('/system/login', form,{ headers: headers1 })
      .pipe(
        map((response:any) => {
          let res= response;
          if(res && res?.role){
            res.roles=[response.role];
          }
          console.log(res);
          return res;
        }),
        catchError((error) => {
          return throwError(() => of(new Error(error)));
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            res.password=form.password;
            sessionStorage.setItem(
              'token',
              JSON.stringify(res)
            );
            let userParsed: User = this.getUser();
            if (userParsed != null) {
              this.userObject = new User(
                userParsed?.id,
                userParsed?.name,
                userParsed?.passwod,
                userParsed?.roles
              );
              this.user.next(this.userObject);
              this.route.navigate(["/home"]);
            }
          }
        },
        error: (errorRes) => {
          console.log(errorRes);
          this.user.next(null);
        },
      });
    return true;
  }

  logout() {
    this.loggedIn = false;
    this._httpClient.get('https://google.com').subscribe({
      next: (res) => {
        if (res) {
          sessionStorage.removeItem('token');
          this.userObject = null;
    this.user.next(null);
        }
      },
      error: (errorRes) => {
        console.log(errorRes);
        sessionStorage.removeItem('token');
        this.userObject = null;
    this.user.next(null);
      },
    });
  }

  signUp(form:any){
    if(form.isManager){
      return this._httpClient.post("/system/stadium-managers/register",form);
    }
    return this._httpClient.post("/system/customer/register",form);
  }

  getUser() {
    if (this.userObject != null) {
      return this.userObject;
    }
    let user = JSON.parse(sessionStorage.getItem('token') as string);
    if (user != null) {
      this.userObject = user;
    }
    return this.userObject;
  }

  isValidUser(): boolean {
    return this.getUser() != null;
  }

  hasRole(roleName: string) {
    let user: User = this.getUser();
    if(user == null) {
      return false;
    }
    return user.roles.includes(roleName);
  }

  isManager(){
    return (this.hasRole("manager") || this.hasRole("admin"));
  }
}
