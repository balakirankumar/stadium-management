import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./Auth.Service";




@Injectable()
export class AuthGuard{

    constructor(private router: Router, private authenticationService:AuthService) {

    }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<boolean> | Promise<boolean>  | boolean {
      //your logic goes here
      return this.authenticationService.isAuthenticated().then(
        (authenticated:boolean)=>{
            if(this.authenticationService.isValidUser() && this.authenticationService.hasRole("user")){
                return true;
            }
             else{
                return this.router.navigate(['/login'])
             }
        });
  }
}

export const Authguard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuard).canActivate(next, state);
  }

