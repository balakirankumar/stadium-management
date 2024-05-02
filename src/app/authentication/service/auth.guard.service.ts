import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.Service';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<boolean> | Promise<boolean> | boolean {
    //your logic goes here

    if (
      this.authenticationService.isValidUser() &&
      (this.authenticationService.hasRole('manager') ||
        this.authenticationService.hasRole('admin'))
    ) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }


  isUserLoggedIn(next:any, state:any): any | Observable<boolean> | Promise<boolean> | boolean{
    let token:any =sessionStorage.getItem("token");
    if(token == null){
      return this.router.navigate(['/login']);
    }
    return true;

  }
}

export const Authguard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthGuard).canActivate(next, state);
};



export const LoginGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthGuard).isUserLoggedIn(next, state);
};
